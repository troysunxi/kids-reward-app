// ===== 数据存储 =====
const STORAGE_KEY = 'kidsRewardApp';

// 应用状态
let appData = {
    children: [],
    currentChildId: null,
    selectedAvatar: '👦',
    selectedIcon: '🎁',
    pendingExchange: null
};

// 学习推荐内容
const learningContent = {
    chinese: [
        { title: '古诗词欣赏', desc: '学习经典古诗，感受中华文化的魅力', icon: '📖' },
        { title: '汉字书写练习', desc: '练习书写汉字，提高书写能力', icon: '✍️' },
        { title: '成语故事', desc: '通过有趣的故事学习成语', icon: '📚' }
    ],
    math: [
        { title: '趣味数学游戏', desc: '通过游戏学习数学概念', icon: '🔢' },
        { title: '口算练习', desc: '提高口算速度和准确率', icon: '🧮' },
        { title: '逻辑思维训练', desc: '培养逻辑思维能力', icon: '🧩' }
    ],
    english: [
        { title: '英语单词闯关', desc: '趣味记单词，轻松学英语', icon: '🔤' },
        { title: '英语绘本阅读', desc: '阅读有趣的英语绘本', icon: '📗' },
        { title: '英语儿歌学唱', desc: '通过儿歌学习英语', icon: '🎵' }
    ]
};

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderChildrenList();
    updateUI();
});

// ===== 数据持久化 =====
function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        appData = JSON.parse(saved);
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

// ===== 儿童管理 =====
function showAddChildModal() {
    document.getElementById('newChildName').value = '';
    document.getElementById('newChildPoints').value = '0';
    appData.selectedAvatar = '👦';
    resetAvatarSelection();
    document.getElementById('addChildModal').classList.add('show');
}

function resetAvatarSelection() {
    document.querySelectorAll('.avatar-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.avatar === appData.selectedAvatar) {
            btn.classList.add('selected');
        }
    });
}

function selectAvatar(avatar, element) {
    appData.selectedAvatar = avatar;
    document.querySelectorAll('.avatar-btn').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
}

function addChild() {
    const name = document.getElementById('newChildName').value.trim();
    const points = parseInt(document.getElementById('newChildPoints').value) || 0;
    
    if (!name) {
        alert('请输入宝贝的名字！');
        return;
    }
    
    const child = {
        id: Date.now().toString(),
        name: name,
        avatar: appData.selectedAvatar,
        points: points,
        mood: 'normal',
        history: [],
        rewards: getDefaultRewards(),
        learningThreshold: 50, // 达到50分显示学习推荐
        hasShownLearning: false
    };
    
    appData.children.push(child);
    appData.currentChildId = child.id;
    saveData();
    
    closeModal('addChildModal');
    renderChildrenList();
    showChildDetail(child.id);
    
    // 添加庆祝动画
    document.querySelector('.child-card').classList.add('celebration');
    setTimeout(() => {
        document.querySelector('.child-card').classList.remove('celebration');
    }, 500);
}

function deleteChild(childId, event) {
    event.stopPropagation();
    
    if (!confirm('确定要删除这个宝贝吗？所有数据将被清除！')) {
        return;
    }
    
    appData.children = appData.children.filter(c => c.id !== childId);
    
    if (appData.currentChildId === childId) {
        appData.currentChildId = appData.children.length > 0 ? appData.children[0].id : null;
    }
    
    saveData();
    renderChildrenList();
    updateUI();
}

function selectChild(childId) {
    appData.currentChildId = childId;
    saveData();
    renderChildrenList();
    showChildDetail(childId);
}

function renderChildrenList() {
    const container = document.getElementById('childrenList');
    
    if (appData.children.length === 0) {
        container.innerHTML = '<p class="history-empty">还没有添加宝贝，点击上方"添加宝贝"按钮开始吧！</p>';
        return;
    }
    
    container.innerHTML = appData.children.map(child => `
        <div class="child-card-mini ${child.id === appData.currentChildId ? 'active' : ''}" onclick="selectChild('${child.id}')">
            <button class="delete-btn" onclick="deleteChild('${child.id}', event)">×</button>
            <div class="avatar">${child.avatar}</div>
            <div class="name">${child.name}</div>
            <div class="points">⭐ ${child.points}</div>
        </div>
    `).join('');
}

function getCurrentChild() {
    return appData.children.find(c => c.id === appData.currentChildId);
}

// ===== UI 更新 =====
function updateUI() {
    const child = getCurrentChild();
    
    if (!child) {
        document.getElementById('childDetail').style.display = 'none';
        document.getElementById('welcomeSection').style.display = 'block';
        return;
    }
    
    document.getElementById('childDetail').style.display = 'block';
    document.getElementById('welcomeSection').style.display = 'none';
    
    showChildDetail(child.id);
}

function showChildDetail(childId) {
    const child = appData.children.find(c => c.id === childId);
    if (!child) return;
    
    // 更新基本信息
    document.getElementById('childAvatar').textContent = child.avatar;
    document.getElementById('childName').textContent = child.name;
    document.getElementById('childPoints').textContent = child.points;
    
    // 更新心情选择
    updateMoodSelector(child.mood);
    
    // 更新奖励列表
    renderRewardsList(child);
    
    // 更新历史记录
    renderHistoryList(child);
    
    // 检查是否显示学习推荐
    checkLearningRecommendation(child);
}

function updateMoodSelector(currentMood) {
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mood === currentMood) {
            btn.classList.add('active');
        }
    });
}

// ===== 心情管理 =====
function setMood(mood) {
    const child = getCurrentChild();
    if (!child) return;
    
    child.mood = mood;
    saveData();
    updateMoodSelector(mood);
    
    // 添加历史记录
    const moodNames = {
        happy: '😊 开心',
        excited: '🤩 兴奋',
        normal: '😐 平静',
        sad: '😢 难过'
    };
    
    addHistory(child, 'mood', `心情记录：${moodNames[mood]}`, 0);
}

// ===== 积分系统 =====
function addPoints(points) {
    const child = getCurrentChild();
    if (!child) return;
    
    child.points += points;
    
    const reasons = {
        5: '表现很棒',
        3: '做得不错',
        1: '小进步'
    };
    
    addHistory(child, 'reward', reasons[points] || `获得 ${points} 分`, points);
    saveData();
    updateUI();
    
    // 庆祝动画
    const pointsElement = document.getElementById('childPoints');
    pointsElement.classList.add('celebration');
    setTimeout(() => pointsElement.classList.remove('celebration'), 500);
    
    // 检查学习推荐
    checkLearningRecommendation(child);
}

function subtractPoints(points) {
    const child = getCurrentChild();
    if (!child) return;
    
    if (child.points < points) {
        alert('积分不足！');
        return;
    }
    
    child.points -= points;
    
    const reasons = {
        3: '需要改进',
        1: '小提醒'
    };
    
    addHistory(child, 'punish', reasons[points] || `扣除 ${points} 分`, -points);
    saveData();
    updateUI();
}

function showCustomPointsModal() {
    document.getElementById('customPointsValue').value = '';
    document.getElementById('customPointsReason').value = '';
    document.getElementById('customPointsModal').classList.add('show');
}

function applyCustomPoints() {
    const child = getCurrentChild();
    if (!child) return;
    
    const value = parseInt(document.getElementById('customPointsValue').value);
    const reason = document.getElementById('customPointsReason').value.trim() || '自定义操作';
    
    if (isNaN(value) || value === 0) {
        alert('请输入有效的积分变化！');
        return;
    }
    
    if (value < 0 && child.points < Math.abs(value)) {
        alert('积分不足！');
        return;
    }
    
    child.points += value;
    
    const type = value > 0 ? 'reward' : 'punish';
    addHistory(child, type, reason, value);
    saveData();
    closeModal('customPointsModal');
    updateUI();
    
    // 检查学习推荐
    if (value > 0) {
        checkLearningRecommendation(child);
    }
}

// ===== 奖励系统 =====
function getDefaultRewards() {
    return [
        { id: '1', name: '小零食', points: 10, icon: '🍬' },
        { id: '2', name: '看动画片30分钟', points: 20, icon: '🎬' },
        { id: '3', name: '小玩具', points: 50, icon: '🧸' },
        { id: '4', name: '去游乐园', points: 100, icon: '🎢' }
    ];
}

function showAddRewardModal() {
    document.getElementById('newRewardName').value = '';
    document.getElementById('newRewardPoints').value = '10';
    appData.selectedIcon = '🎁';
    resetIconSelection();
    document.getElementById('addRewardModal').classList.add('show');
}

function resetIconSelection() {
    document.querySelectorAll('.icon-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.icon === appData.selectedIcon) {
            btn.classList.add('selected');
        }
    });
}

function selectIcon(icon, element) {
    appData.selectedIcon = icon;
    document.querySelectorAll('.icon-btn').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
}

function addReward() {
    const child = getCurrentChild();
    if (!child) return;
    
    const name = document.getElementById('newRewardName').value.trim();
    const points = parseInt(document.getElementById('newRewardPoints').value) || 10;
    
    if (!name) {
        alert('请输入奖励名称！');
        return;
    }
    
    const reward = {
        id: Date.now().toString(),
        name: name,
        points: points,
        icon: appData.selectedIcon
    };
    
    child.rewards.push(reward);
    saveData();
    
    closeModal('addRewardModal');
    renderRewardsList(child);
}

function deleteReward(rewardId, event) {
    event.stopPropagation();
    
    const child = getCurrentChild();
    if (!child) return;
    
    if (!confirm('确定要删除这个奖励吗？')) {
        return;
    }
    
    child.rewards = child.rewards.filter(r => r.id !== rewardId);
    saveData();
    renderRewardsList(child);
}

function renderRewardsList(child) {
    const container = document.getElementById('rewardsList');
    
    if (!child.rewards || child.rewards.length === 0) {
        container.innerHTML = '<p class="history-empty">还没有奖励项目，点击"添加奖励"创建吧！</p>';
        return;
    }
    
    container.innerHTML = child.rewards.map(reward => {
        const canExchange = child.points >= reward.points;
        return `
            <div class="reward-card ${canExchange ? '' : 'disabled'}" onclick="${canExchange ? `tryExchange('${reward.id}')` : ''}">
                <button class="delete-reward-btn" onclick="deleteReward('${reward.id}', event)">×</button>
                <div class="reward-icon">${reward.icon}</div>
                <div class="reward-name">${reward.name}</div>
                <div class="reward-points">⭐ ${reward.points}</div>
            </div>
        `;
    }).join('');
}

function tryExchange(rewardId) {
    const child = getCurrentChild();
    if (!child) return;
    
    const reward = child.rewards.find(r => r.id === rewardId);
    if (!reward) return;
    
    if (child.points < reward.points) {
        alert('积分不足，继续加油哦！');
        return;
    }
    
    appData.pendingExchange = { childId: child.id, rewardId: reward.id };
    document.getElementById('exchangeMessage').textContent = 
        `确定要用 ${reward.points} 积分兑换「${reward.name}」吗？`;
    document.getElementById('confirmExchangeModal').classList.add('show');
}

function confirmExchange() {
    if (!appData.pendingExchange) return;
    
    const child = appData.children.find(c => c.id === appData.pendingExchange.childId);
    const reward = child.rewards.find(r => r.id === appData.pendingExchange.rewardId);
    
    if (!child || !reward) return;
    
    child.points -= reward.points;
    addHistory(child, 'exchange', `兑换奖励：${reward.name}`, -reward.points);
    
    // 兑换奖励时心情变为兴奋
    child.mood = 'excited';
    
    saveData();
    closeModal('confirmExchangeModal');
    appData.pendingExchange = null;
    updateUI();
    
    // 庆祝动画
    alert(`🎉 恭喜！成功兑换「${reward.name}」！`);
}

// ===== 历史记录 =====
function addHistory(child, type, title, points) {
    const history = {
        id: Date.now().toString(),
        type: type,
        title: title,
        points: points,
        time: new Date().toISOString()
    };
    
    child.history.unshift(history);
    
    // 只保留最近50条记录
    if (child.history.length > 50) {
        child.history = child.history.slice(0, 50);
    }
}

function renderHistoryList(child) {
    const container = document.getElementById('historyList');
    
    if (!child.history || child.history.length === 0) {
        container.innerHTML = '<p class="history-empty">还没有记录，开始记录宝贝的成长吧！</p>';
        return;
    }
    
    const icons = {
        reward: '🌟',
        punish: '⚠️',
        exchange: '🎁',
        mood: '😊'
    };
    
    container.innerHTML = child.history.map(item => {
        const date = new Date(item.time);
        const timeStr = `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        
        return `
            <div class="history-item ${item.type}">
                <div class="history-icon">${icons[item.type] || '📝'}</div>
                <div class="history-content">
                    <div class="history-title">${item.title}</div>
                    <div class="history-time">${timeStr}</div>
                </div>
                ${item.points !== 0 ? `<div class="history-points">${item.points > 0 ? '+' : ''}${item.points}</div>` : ''}
            </div>
        `;
    }).join('');
}

// ===== 学习推荐 =====
function checkLearningRecommendation(child) {
    const section = document.getElementById('learningSection');
    const cards = document.getElementById('learningCards');
    
    // 当积分达到阈值且心情为兴奋时显示学习推荐
    if (child.points >= child.learningThreshold && child.mood === 'excited') {
        section.style.display = 'block';
        
        // 随机选择每个科目的一个推荐
        const chinese = learningContent.chinese[Math.floor(Math.random() * learningContent.chinese.length)];
        const math = learningContent.math[Math.floor(Math.random() * learningContent.math.length)];
        const english = learningContent.english[Math.floor(Math.random() * learningContent.english.length)];
        
        cards.innerHTML = `
            <div class="learning-card chinese" onclick="showLearningTip('chinese')">
                <div class="subject-icon">${chinese.icon}</div>
                <div class="subject-name">语文：${chinese.title}</div>
                <div class="subject-desc">${chinese.desc}</div>
            </div>
            <div class="learning-card math" onclick="showLearningTip('math')">
                <div class="subject-icon">${math.icon}</div>
                <div class="subject-name">数学：${math.title}</div>
                <div class="subject-desc">${math.desc}</div>
            </div>
            <div class="learning-card english" onclick="showLearningTip('english')">
                <div class="subject-icon">${english.icon}</div>
                <div class="subject-name">英语：${english.title}</div>
                <div class="subject-desc">${english.desc}</div>
            </div>
        `;
    } else {
        section.style.display = 'none';
    }
}

function showLearningTip(subject) {
    const subjectNames = {
        chinese: '语文',
        math: '数学',
        english: '英语'
    };
    
    alert(`📚 太棒了！${subjectNames[subject]}学习内容即将上线，敬请期待！`);
}

// ===== 弹窗管理 =====
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// 点击弹窗外部关闭
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});

// ===== 键盘快捷键 =====
document.addEventListener('keydown', (e) => {
    // ESC 关闭弹窗
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
        });
    }
});
