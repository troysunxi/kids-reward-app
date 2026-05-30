/**
 * Supabase 认证与数据同步模块
 * 
 * 功能：
 * - 邮箱+密码 注册/登录
 * - 手机号+验证码 登录
 * - 用户数据云端同步
 * - 多设备数据一致性
 */

// ===== Supabase 配置 =====
const SUPABASE_URL = 'https://huwlajugwvahpunrtnew.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Be3VjK-BVukIJvz7ZdYuBA_OxW5X2kq';

// Supabase 客户端实例
let supabaseClient = null;

// 认证状态
let authState = {
    isLoggedIn: false,
    user: null,
    session: null,
    isLoading: true
};

// ===== 初始化 Supabase =====
function initSupabase() {
    if (typeof supabase === 'undefined' || !supabase.createClient) {
        console.warn('Supabase SDK 未加载，将使用本地存储模式');
        authState.isLoading = false;
        updateAuthUI();
        return;
    }
    
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
        console.warn('Supabase 未配置，将使用本地存储模式');
        authState.isLoading = false;
        updateAuthUI();
        return;
    }
    
    try {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        // 监听认证状态变化
        supabaseClient.auth.onAuthStateChange((event, session) => {
            console.log('认证状态变化:', event);
            authState.session = session;
            authState.user = session?.user || null;
            authState.isLoggedIn = !!session;
            authState.isLoading = false;
            updateAuthUI();
            
            if (event === 'SIGNED_IN') {
                onUserSignedIn();
            } else if (event === 'SIGNED_OUT') {
                onUserSignedOut();
            }
        });
        
        // 获取当前会话
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            authState.session = session;
            authState.user = session?.user || null;
            authState.isLoggedIn = !!session;
            authState.isLoading = false;
            updateAuthUI();
            
            if (session) {
                loadUserDataFromCloud();
            }
        });
    } catch (error) {
        console.error('Supabase 初始化失败:', error);
        authState.isLoading = false;
        updateAuthUI();
    }
}

// ===== 邮箱注册 =====
async function signUpWithEmail(email, password, nickname) {
    if (!supabaseClient) {
        alert('云端服务未配置，请先配置 Supabase');
        return;
    }
    
    showLoading('正在注册...');
    
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                nickname: nickname || email.split('@')[0]
            }
        }
    });
    
    hideLoading();
    
    if (error) {
        alert('注册失败：' + error.message);
        return;
    }
    
    if (data.user && !data.session) {
        // 需要邮箱验证
        alert('✅ 注册成功！请检查你的邮箱，点击验证链接完成注册。');
        showAuthModal('login');
    } else if (data.session) {
        // 自动登录成功
        alert('🎉 注册成功，已自动登录！');
        closeAuthModal();
    }
}

// ===== 邮箱登录 =====
async function signInWithEmail(email, password) {
    if (!supabaseClient) {
        alert('云端服务未配置，请先配置 Supabase');
        return;
    }
    
    showLoading('正在登录...');
    
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });
    
    hideLoading();
    
    if (error) {
        alert('登录失败：' + error.message);
        return;
    }
    
    alert('🎉 登录成功！');
    closeAuthModal();
}

// ===== 手机号发送验证码 =====
async function sendPhoneOTP(phone) {
    if (!supabaseClient) {
        alert('云端服务未配置，请先配置 Supabase');
        return;
    }
    
    // 验证手机号格式（中国大陆手机号）
    if (!/^1[3-9]\d{9}$/.test(phone)) {
        alert('请输入正确的手机号');
        return;
    }
    
    showLoading('正在发送验证码...');
    
    const { data, error } = await supabaseClient.auth.signInWithOtp({
        phone: '+86' + phone
    });
    
    hideLoading();
    
    if (error) {
        alert('发送验证码失败：' + error.message);
        return;
    }
    
    // 显示验证码输入区域
    document.getElementById('otpSection').style.display = 'block';
    document.getElementById('sendOTPBtn').disabled = true;
    document.getElementById('sendOTPBtn').textContent = '已发送(60s)';
    
    // 60秒倒计时
    let countdown = 60;
    const timer = setInterval(() => {
        countdown--;
        document.getElementById('sendOTPBtn').textContent = `重新发送(${countdown}s)`;
        if (countdown <= 0) {
            clearInterval(timer);
            document.getElementById('sendOTPBtn').disabled = false;
            document.getElementById('sendOTPBtn').textContent = '重新发送验证码';
        }
    }, 1000);
    
    alert('✅ 验证码已发送到 ' + phone);
}

// ===== 验证手机 OTP =====
async function verifyPhoneOTP(phone, otp) {
    if (!supabaseClient) {
        alert('云端服务未配置');
        return;
    }
    
    if (otp.length !== 6) {
        alert('请输入6位验证码');
        return;
    }
    
    showLoading('正在验证...');
    
    const { data, error } = await supabaseClient.auth.verifyOtp({
        phone: '+86' + phone,
        token: otp,
        type: 'sms'
    });
    
    hideLoading();
    
    if (error) {
        alert('验证失败：' + error.message);
        return;
    }
    
    alert('🎉 登录成功！');
    closeAuthModal();
}

// ===== 退出登录 =====
async function signOut() {
    if (!supabaseClient) return;
    
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
        console.error('退出失败:', error);
    }
}

// ===== 用户登录后的操作 =====
async function onUserSignedIn() {
    // 加载云端数据
    await loadUserDataFromCloud();
}

function onUserSignedOut() {
    // 清除云端数据标记，保留本地数据
    console.log('用户已退出登录');
}

// ===== 数据同步 =====

// 将本地数据上传到云端
async function syncDataToCloud() {
    if (!supabaseClient || !authState.isLoggedIn) return;
    
    const userId = authState.user.id;
    
    try {
        // 检查是否已有数据
        const { data: existing } = await supabaseClient
            .from('user_data')
            .select('id')
            .eq('user_id', userId)
            .single();
        
        const cloudData = {
            user_id: userId,
            children: appData.children,
            current_child_id: appData.currentChildId,
            updated_at: new Date().toISOString()
        };
        
        if (existing) {
            // 更新
            await supabaseClient
                .from('user_data')
                .update(cloudData)
                .eq('user_id', userId);
        } else {
            // 插入
            await supabaseClient
                .from('user_data')
                .insert(cloudData);
        }
        
        console.log('数据同步到云端成功');
    } catch (error) {
        console.error('数据同步失败:', error);
    }
}

// 从云端加载数据
async function loadUserDataFromCloud() {
    if (!supabaseClient || !authState.isLoggedIn) return;
    
    const userId = authState.user.id;
    
    try {
        const { data, error } = await supabaseClient
            .from('user_data')
            .select('*')
            .eq('user_id', userId)
            .single();
        
        if (error) {
            console.log('云端无数据，使用本地数据');
            // 如果本地有数据，上传到云端
            if (appData.children.length > 0) {
                syncDataToCloud();
            }
            return;
        }
        
        if (data && data.children) {
            // 检查云端数据是否比本地新
            const localData = localStorage.getItem(STORAGE_KEY);
            const localTime = localData ? JSON.parse(localData).lastSyncTime : null;
            
            if (!localTime || new Date(data.updated_at) > new Date(localTime)) {
                // 云端数据更新，使用云端数据
                appData.children = data.children;
                appData.currentChildId = data.current_child_id;
                saveData();
                renderChildrenList();
                updateUI();
                console.log('已从云端加载数据');
            }
        }
    } catch (error) {
        console.error('加载云端数据失败:', error);
    }
}

// ===== UI 更新 =====
function updateAuthUI() {
    const authContainer = document.getElementById('authContainer');
    if (!authContainer) return;
    
    if (authState.isLoading) {
        authContainer.innerHTML = '<span class="auth-loading">⏳ 加载中...</span>';
        return;
    }
    
    if (authState.isLoggedIn) {
        const nickname = authState.user?.user_metadata?.nickname || 
                          authState.user?.email || 
                          authState.user?.phone || 
                          '用户';
        authContainer.innerHTML = `
            <div class="user-info">
                <span class="user-avatar">👤</span>
                <span class="user-name">${nickname}</span>
                <button class="btn btn-logout" onclick="handleSignOut()">退出</button>
            </div>
        `;
    } else {
        authContainer.innerHTML = `
            <button class="btn btn-login" onclick="showAuthModal('login')">🔐 登录</button>
            <button class="btn btn-register" onclick="showAuthModal('register')">📝 注册</button>
        `;
    }
}

// ===== 弹窗管理 =====
function showAuthModal(mode) {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const phoneForm = document.getElementById('phoneForm');
    
    if (mode === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else if (mode === 'register') {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    } else if (mode === 'phone') {
        loginTab.classList.remove('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        phoneForm.style.display = 'block';
    }
    
    modal.classList.add('show');
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('show');
}

function switchAuthTab(tab) {
    if (tab === 'login') {
        showAuthModal('login');
    } else if (tab === 'register') {
        showAuthModal('register');
    }
}

function switchToPhoneLogin() {
    showAuthModal('phone');
}

// ===== 加载状态 =====
function showLoading(message) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.querySelector('.loading-text').textContent = message || '加载中...';
        overlay.style.display = 'flex';
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// ===== 退出登录处理 =====
function handleSignOut() {
    if (confirm('确定要退出登录吗？退出后数据仍保存在本地。')) {
        signOut();
    }
}

// ===== 表单提交处理 =====
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('请输入邮箱和密码');
        return;
    }
    
    signInWithEmail(email, password);
}

function handleRegister(event) {
    event.preventDefault();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const nickname = document.getElementById('regNickname').value.trim();
    
    if (!email || !password) {
        alert('请输入邮箱和密码');
        return;
    }
    
    if (password.length < 6) {
        alert('密码至少需要6个字符');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('两次输入的密码不一致');
        return;
    }
    
    signUpWithEmail(email, password, nickname);
}

function handlePhoneLogin(event) {
    event.preventDefault();
    const phone = document.getElementById('phoneInput').value.trim();
    const otp = document.getElementById('otpInput').value.trim();
    
    if (!otp) {
        sendPhoneOTP(phone);
    } else {
        verifyPhoneOTP(phone, otp);
    }
}

// ===== 覆盖原有的 saveData 函数，添加云同步 =====
const originalSaveData = typeof saveData === 'function' ? saveData : null;

function saveDataWithSync() {
    // 先保存到本地
    if (originalSaveData) {
        originalSaveData();
    } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    }
    
    // 记录同步时间
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    saved.lastSyncTime = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    
    // 异步同步到云端
    syncDataToCloud();
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    initSupabase();
});
