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

// 当前页面状态
let currentPage = 'home';
let currentArticleCategory = 'all';

// ===== 博客文章数据 =====
const blogArticles = [
    {
        id: 1,
        title: '如何用积分奖励系统培养孩子的好习惯？',
        category: 'education',
        categoryName: '教育方法',
        excerpt: '积分奖励是一种科学有效的正向激励方式，通过及时反馈帮助孩子建立良好行为习惯。本文详细介绍如何设计合理的积分系统...',
        content: `
            <div class="article-info">
                <span>📅 2024-05-20</span>
                <span>👁️ 1,234 阅读</span>
                <span>💬 28 评论</span>
            </div>
            <h1>如何用积分奖励系统培养孩子的好习惯？</h1>
            <p>在孩子的成长过程中，良好习惯的养成至关重要。而积分奖励系统作为一种科学有效的正向激励方式，正在被越来越多的家长所接受和使用。</p>
            
            <h2>什么是积分奖励系统？</h2>
            <p>积分奖励系统是一种行为管理工具，通过给孩子设定明确的目标和奖励机制，激励他们完成特定任务或表现良好行为。每当孩子完成任务或表现良好时，就能获得相应的积分，积分累积到一定数量后可以兑换奖励。</p>
            
            <h2>为什么积分奖励有效？</h2>
            <ul>
                <li><strong>即时反馈</strong>：孩子能立即看到自己的努力成果，增强成就感</li>
                <li><strong>目标明确</strong>：清晰的目标让孩子知道该做什么</li>
                <li><strong>自主选择</strong>：孩子可以选择自己喜欢的奖励，提高参与积极性</li>
                <li><strong>可视化进度</strong>：积分累积过程让孩子看到自己的进步</li>
            </ul>
            
            <h2>如何设计合理的积分系统？</h2>
            <h3>1. 设定合理的积分规则</h3>
            <p>积分规则要简单明了，让孩子容易理解和执行。例如：</p>
            <ul>
                <li>按时起床：+2分</li>
                <li>完成作业：+3分</li>
                <li>帮忙做家务：+2分</li>
                <li>礼貌待人：+1分</li>
            </ul>
            
            <h3>2. 准备吸引人的奖励</h3>
            <p>奖励不一定要昂贵，关键是孩子喜欢。可以是：</p>
            <ul>
                <li>额外的玩耍时间</li>
                <li>选择周末活动</li>
                <li>小零食或玩具</li>
                <li>父母的特别陪伴时间</li>
            </ul>
            
            <h3>3. 保持一贯性</h3>
            <p>规则一旦制定，就要坚持执行。家长要保持一致，不能因为心情好就放松标准，也不能因为忙碌而忽视奖励。</p>
            
            <h2>常见误区要避免</h2>
            <blockquote>
                "积分奖励不是贿赂，而是帮助孩子建立内在动力的工具。"
            </blockquote>
            <ul>
                <li><strong>不要过度奖励</strong>：简单的日常行为不需要奖励</li>
                <li><strong>不要只关注结果</strong>：努力的过程同样值得肯定</li>
                <li><strong>不要与其他孩子比较</strong>：每个孩子都有自己的节奏</li>
                <li><strong>不要忽视情感交流</strong>：积分不能替代父母的关爱</li>
            </ul>
            
            <h2>让积分系统更有趣</h2>
            <p>可以加入一些有趣的元素：</p>
            <ul>
                <li>制作漂亮的积分卡或图表</li>
                <li>设置特殊成就徽章</li>
                <li>定期举办"积分兑换日"</li>
                <li>让孩子参与规则制定</li>
            </ul>
            
            <h2>总结</h2>
            <p>积分奖励系统是培养孩子好习惯的有效工具，但关键在于合理使用。它应该帮助孩子建立内在动力，而不是成为控制孩子的手段。记住，最好的奖励永远是父母的认可和爱。</p>
        `,
        image: '🎯',
        date: '2024-05-20',
        views: 1234,
        comments: 28
    },
    {
        id: 2,
        title: '3-6岁儿童心理发展特点与教育方法',
        category: 'psychology',
        categoryName: '儿童心理',
        excerpt: '3-6岁是儿童心理发展的关键期，了解这个阶段的心理特点，能够帮助家长更好地引导孩子成长...',
        content: `
            <div class="article-info">
                <span>📅 2024-05-18</span>
                <span>👁️ 2,156 阅读</span>
                <span>💬 45 评论</span>
            </div>
            <h1>3-6岁儿童心理发展特点与教育方法</h1>
            <p>3-6岁被称为"学龄前期"，是儿童心理发展的关键阶段。这个时期的孩子在认知、情感、社交等方面都有显著发展，了解这些特点对家长的教育方式至关重要。</p>
            
            <h2>认知发展特点</h2>
            <h3>1. 具体形象思维</h3>
            <p>这个阶段的孩子主要依靠具体形象进行思维，抽象概念对他们来说还难以理解。因此，教育时要多用具体事例、图片、实物等。</p>
            
            <h3>2. 好奇心旺盛</h3>
            <p>孩子对周围世界充满好奇，喜欢问"为什么"。这是培养学习兴趣的好时机，家长要耐心回答，鼓励探索。</p>
            
            <h3>3. 注意力短暂</h3>
            <p>3岁孩子的注意力只能维持5-10分钟，6岁时可达15-20分钟。因此，学习活动要短小有趣，适时休息。</p>
            
            <h2>情感发展特点</h2>
            <ul>
                <li><strong>情绪外露</strong>：喜怒哀乐都表现在脸上，需要学习情绪管理</li>
                <li><strong>依恋关系</strong>：对父母仍有强烈依恋，需要安全感</li>
                <li><strong>自尊心萌芽</strong>：开始在意他人评价，需要正向鼓励</li>
                <li><strong>同理心发展</strong>：能初步理解他人感受，可以培养关爱品质</li>
            </ul>
            
            <h2>社交发展特点</h2>
            <p>从3岁的平行游戏（各玩各的）到6岁的合作游戏，孩子的社交能力快速发展：</p>
            <ul>
                <li>开始喜欢与同伴玩耍</li>
                <li>学习分享和轮流</li>
                <li>出现"最好的朋友"概念</li>
                <li>开始理解规则的重要性</li>
            </ul>
            
            <h2>教育方法建议</h2>
            <h3>1. 游戏化学习</h3>
            <p>通过游戏进行教育是最有效的方式。例如：</p>
            <ul>
                <li>角色扮演游戏培养社交能力</li>
                <li>拼图游戏发展空间思维</li>
                <li>儿歌游戏提升语言能力</li>
            </ul>
            
            <h3>2. 正面管教</h3>
            <blockquote>
                "与其批评孩子的错误，不如表扬他们的进步。"
            </blockquote>
            <ul>
                <li>多鼓励，少批评</li>
                <li>关注过程，而非只看结果</li>
                <li>给孩子选择的权利</li>
                <li>用自然结果代替惩罚</li>
            </ul>
            
            <h3>3. 建立规则意识</h3>
            <p>这个阶段是建立规则意识的关键期：</p>
            <ul>
                <li>规则要简单明确</li>
                <li>家长要以身作则</li>
                <li>执行要一致</li>
                <li>解释规则背后的原因</li>
            </ul>
            
            <h2>家长需要注意</h2>
            <ul>
                <li><strong>避免过度保护</strong>：让孩子适当尝试和犯错</li>
                <li><strong>不要拔苗助长</strong>：尊重孩子的发展节奏</li>
                <li><strong>减少屏幕时间</strong>：多进行亲子互动和户外活动</li>
                <li><strong>保证充足睡眠</strong>：3-6岁需要10-13小时睡眠</li>
            </ul>
            
            <h2>结语</h2>
            <p>每个孩子都是独特的，发展节奏也不尽相同。家长要做的是提供适宜的环境和引导，而不是急于求成。记住，快乐的童年本身就是最好的教育。</p>
        `,
        image: '🧠',
        date: '2024-05-18',
        views: 2156,
        comments: 45
    },
    {
        id: 3,
        title: '10个实用方法，帮孩子养成按时起床的习惯',
        category: 'habits',
        categoryName: '习惯培养',
        excerpt: '起床困难是很多家庭早上的"噩梦"。本文分享10个经过验证的实用方法，让起床变得轻松愉快...',
        content: `
            <div class="article-info">
                <span>📅 2024-05-15</span>
                <span>👁️ 3,421 阅读</span>
                <span>💬 67 评论</span>
            </div>
            <h1>10个实用方法，帮孩子养成按时起床的习惯</h1>
            <p>"再睡五分钟！"这是多少家庭每天早上都要上演的对话。起床困难不仅影响孩子的作息，也让家长身心俱疲。以下是10个经过验证的实用方法：</p>
            
            <h2>1. 建立固定的作息时间</h2>
            <p>孩子的生物钟需要规律。每天同一时间睡觉、同一时间起床，包括周末。坚持一段时间后，孩子到点自然会醒。</p>
            
            <h2>2. 提前准备，减少早晨压力</h2>
            <p>前一晚准备好第二天要穿的衣服、书包、鞋子等。早晨没有找东西的压力，起床会更轻松。</p>
            
            <h2>3. 用音乐代替闹钟</h2>
            <p>刺耳的闹钟会让孩子产生抗拒。可以选择孩子喜欢的轻快音乐，音量从小到大，让起床变得愉快。</p>
            
            <h2>4. 阳光是最好的闹钟</h2>
            <p>拉开窗帘，让自然光进入房间。阳光会抑制褪黑素分泌，帮助孩子自然清醒。</p>
            
            <h2>5. 设置"缓冲时间"</h2>
            <p>不要指望孩子一听到叫唤就跳起来。提前10-15分钟开始"唤醒程序"：先开灯、再放音乐、然后温柔地叫名字。</p>
            
            <h2>6. 创造起床的动力</h2>
            <p>告诉孩子起床后有什么值得期待的事情：
            <ul>
                <li>"快起来，今天早餐有你爱吃的 pancakes"</li>
                <li>"今天学校有美术课哦"</li>
                <li>"起来看看窗外，下雪了！"</li>
            </ul>
            </p>
            
            <h2>7. 避免"再睡5分钟"</h2>
            <p>一旦允许"再睡5分钟"，就会没完没了。要坚定但温柔，可以设置一个"最后期限"。</p>
            
            <h2>8. 建立起床仪式</h2>
            <p>创造一些有趣的起床仪式：</p>
            <ul>
                <li>特殊的早安拥抱</li>
                <li>一起拉开窗帘说"早安太阳"</li>
                <li>播放一首"起床歌"</li>
            </ul>
            
            <h2>9. 奖励早起行为</h2>
            <p>使用积分奖励系统，连续一周按时起床可以获得奖励。但记住，奖励应该是额外的惊喜，而不是常态。</p>
            
            <h2>10. 检查睡眠质量</h2>
            <p>如果孩子总是睡不醒，可能是：</p>
            <ul>
                <li>睡得太晚（3-6岁需要10-13小时睡眠）</li>
                <li>睡眠质量不好（检查房间温度、光线、噪音）</li>
                <li>白天活动量不够</li>
                <li>睡前吃太多或太兴奋</li>
            </ul>
            
            <blockquote>
                "养成一个好习惯需要21天，但养成起床习惯可能需要更长时间。耐心是关键。"
            </blockquote>
            
            <h2>特别提醒</h2>
            <p>每个孩子都是不同的，找到适合自己孩子的方法最重要。如果孩子长期起床困难，建议：</p>
            <ul>
                <li>检查是否有睡眠障碍</li>
                <li>评估是否对学校有抗拒心理</li>
                <li>考虑是否晚上活动过于兴奋</li>
            </ul>
            
            <h2>总结</h2>
            <p>培养按时起床的习惯不是一蹴而就的，需要家长的耐心、一致性和创意。把起床变成一件愉快的事，而不是每天的战斗，你会发现孩子的配合度大大提高。</p>
        `,
        image: '🌅',
        date: '2024-05-15',
        views: 3421,
        comments: 67
    },
    {
        id: 4,
        title: '亲子游戏推荐：5个促进智力发展的家庭游戏',
        category: 'games',
        categoryName: '亲子游戏',
        excerpt: '游戏是孩子最好的学习方式。这5个简单有趣的家庭游戏，既能增进亲子关系，又能促进孩子智力发展...',
        content: `
            <div class="article-info">
                <span>📅 2024-05-12</span>
                <span>👁️ 1,876 阅读</span>
                <span>💬 34 评论</span>
            </div>
            <h1>亲子游戏推荐：5个促进智力发展的家庭游戏</h1>
            <p>游戏是孩子的天性，也是最好的学习方式。高质量的亲子游戏不仅能增进亲子关系，还能在玩乐中促进孩子的认知、语言、社交等多方面发展。</p>
            
            <h2>游戏1：记忆翻牌</h2>
            <h3>适合年龄</h3>
            <p>3岁以上</p>
            
            <h3>准备材料</h3>
            <p>纸牌或自制卡片（准备成对的图案）</p>
            
            <h3>玩法</h3>
            <ol>
                <li>将所有卡片背面朝上排列</li>
                <li>轮流翻开两张卡片</li>
                <li>如果图案相同，可以拿走这对卡片</li>
                <li>如果不同，翻回去，记住位置</li>
                <li>最后获得最多卡片的人获胜</li>
            </ol>
            
            <h3>培养能力</h3>
            <ul>
                <li>记忆力</li>
                <li>专注力</li>
                <li>观察力</li>
            </ul>
            
            <h2>游戏2：我是小侦探</h2>
            <h3>适合年龄</h3>
            <p>4岁以上</p>
            
            <h3>玩法</h3>
            <ol>
                <li>家长描述一个家里物品的特征（颜色、用途、位置等）</li>
                <li>孩子根据线索猜是什么</li>
                <li>猜对后角色互换</li>
            </ol>
            
            <h3>示例线索</h3>
            <blockquote>
                "它是软软的，我们每天晚上都要用它，它是白色的..."（答案：枕头）
            </blockquote>
            
            <h3>培养能力</h3>
            <ul>
                <li>逻辑推理</li>
                <li>语言表达能力</li>
                <li>观察力</li>
            </ul>
            
            <h2>游戏3：故事接龙</h2>
            <h3>适合年龄</h3>
            <p>3岁以上</p>
            
            <h3>玩法</h3>
            <ol>
                <li>家长开始讲一个故事（一句话）</li>
                <li>孩子接着讲下一句</li>
                <li>轮流进行，把故事编下去</li>
                <li>可以设定主题或完全自由发挥</li>
            </ol>
            
            <h3>培养能力</h3>
            <ul>
                <li>想象力</li>
                <li>创造力</li>
                <li>语言表达能力</li>
                <li>逻辑思维能力</li>
            </ul>
            
            <h2>游戏4：分类大师</h2>
            <h3>适合年龄</h3>
            <p>2.5岁以上</p>
            
            <h3>准备材料</h3>
            <p>各种小物品（积木、水果、动物玩具等）</p>
            
            <h3>玩法</h3>
            <ol>
                <li>把所有物品混在一起</li>
                <li>让孩子按不同标准分类</li>
                <li>可以按颜色、大小、用途、种类等</li>
                <li>鼓励孩子说出分类理由</li>
            </ol>
            
            <h3>进阶玩法</h3>
            <p>让孩子自己制定分类标准，培养创新思维。</p>
            
            <h3>培养能力</h3>
            <ul>
                <li>分类思维</li>
                <li>归纳能力</li>
                <li>语言表达能力</li>
            </ul>
            
            <h2>游戏5：家庭小剧场</h2>
            <h3>适合年龄</h3>
            <p>4岁以上</p>
            
            <h3>准备材料</h3>
            <p>简单的道具、服装（可选）</p>
            
            <h3>玩法</h3>
            <ol>
                <li>选择一个简单的故事或情景</li>
                <li>分配角色</li>
                <li>简单排练后表演</li>
                <li>可以录下来回看，孩子会很喜欢</li>
            </ol>
            
            <h3>推荐主题</h3>
            <ul>
                <li>小红帽（经典童话）</li>
                <li>超市购物（日常生活）</li>
                <li>医生看病（职业体验）</li>
                <li>自编故事（发挥创意）</li>
            </ul>
            
            <h3>培养能力</h3>
            <ul>
                <li>想象力</li>
                <li>表达能力</li>
                <li>社交能力</li>
                <li>自信心</li>
            </ul>
            
            <h2>游戏小贴士</h2>
            <ul>
                <li><strong>保持轻松氛围</strong>：不要过分强调输赢</li>
                <li><strong>适时调整难度</strong>：根据孩子能力调整规则</li>
                <li><strong>鼓励为主</strong>：多表扬孩子的创意和努力</li>
                <li><strong>控制时间</strong>：每次游戏15-20分钟为宜</li>
                <li><strong>全家参与</strong>：让游戏成为家庭活动</li>
            </ul>
            
            <h2>结语</h2>
            <p>最好的玩具不是最贵的，而是父母的陪伴。这些简单的游戏不需要昂贵的材料，却能给孩子带来无限的快乐和成长。每天抽出30分钟，和孩子一起玩起来吧！</p>
        `,
        image: '🎮',
        date: '2024-05-12',
        views: 1876,
        comments: 34
    },
    {
        id: 5,
        title: '孩子写作业拖拉怎么办？家长必看的7个解决策略',
        category: 'education',
        categoryName: '教育方法',
        excerpt: '写作业拖拉是很多家长的困扰。本文从心理学角度分析原因，并提供7个实用策略，帮助孩子建立良好的学习习惯...',
        content: `
            <div class="article-info">
                <span>📅 2024-05-10</span>
                <span>👁️ 4,532 阅读</span>
                <span>💬 89 评论</span>
            </div>
            <h1>孩子写作业拖拉怎么办？家长必看的7个解决策略</h1>
            <p>"快点写作业！"这句话很多家长每天都要说无数遍。孩子写作业拖拉不仅影响学习效率，还会引发亲子冲突。以下是7个经过验证的解决策略：</p>
            
            <h2>策略1：创造良好的学习环境</h2>
            <p>环境对专注力影响很大：</p>
            <ul>
                <li><strong>固定学习区域</strong>：专门的书桌，不要在学习区玩耍</li>
                <li><strong>减少干扰</strong>：关掉电视，收起玩具</li>
                <li><strong>适当光线</strong>：保护视力，提高专注度</li>
                <li><strong>准备齐全</strong>：文具、水杯提前准备好，避免中途离开</li>
            </ul>
            
            <h2>策略2：制定合理的作业计划</h2>
            <p>把大任务分解成小目标：</p>
            <ol>
                <li>和孩子一起列出所有作业</li>
                <li>估计每项作业需要的时间</li>
                <li>按难易程度排序（先易后难或先难后易）</li>
                <li>设定每项作业的完成时间</li>
                <li>完成一项划掉一项，获得成就感</li>
            </ol>
            
            <h2>策略3：使用番茄工作法</h2>
            <p>适合注意力不集中的孩子：</p>
            <ul>
                <li>设定25分钟专注时间</li>
                <li>这段时间只专注一项任务</li>
                <li>25分钟后休息5分钟</li>
                <li>完成4个"番茄"后，休息15-30分钟</li>
            </ul>
            <p>可以使用计时器或专门的番茄钟APP。</p>
            
            <h2>策略4：建立作业仪式感</h2>
            <p>固定的流程帮助孩子进入学习状态：</p>
            <ol>
                <li>回家后先休息15-20分钟</li>
                <li>吃点水果、上厕所</li>
                <li>准备好学习用品</li>
                <li>开始写作业（可以播放轻音乐）</li>
                <li>完成后检查、整理书包</li>
            </ol>
            
            <h2>策略5：适当使用奖励机制</h2>
            <blockquote>
                "奖励不是贿赂，而是对孩子努力的认可。"
            </blockquote>
            <p>奖励方式：</p>
            <ul>
                <li>积分系统：按时完成作业获得积分</li>
                <li>特权奖励：提前完成作业可以获得额外玩耍时间</li>
                <li>非物质奖励：表扬、拥抱、特别的亲子时间</li>
            </ul>
            <p>注意：奖励要逐渐过渡到内在动力，不要让孩子只为奖励而学习。</p>
            
            <h2>策略6：了解拖拉的真正原因</h2>
            <p>拖拉往往是表象，背后可能有深层原因：</p>
            <table style="width:100%; margin:20px 0;">
                <tr style="background:#f5f5f5;">
                    <th style="padding:10px;">表现</th>
                    <th style="padding:10px;">可能原因</th>
                    <th style="padding:10px;">解决方法</th>
                </tr>
                <tr>
                    <td style="padding:10px; border:1px solid #ddd;">总说"不会"</td>
                    <td style="padding:10px; border:1px solid #ddd;">知识没掌握</td>
                    <td style="padding:10px; border:1px solid #ddd;">先复习再写作业</td>
                </tr>
                <tr>
                    <td style="padding:10px; border:1px solid #ddd;">频繁走神</td>
                    <td style="padding:10px; border:1px solid #ddd;">注意力问题</td>
                    <td style="padding:10px; border:1px solid #ddd;">缩短单次学习时间</td>
                </tr>
                <tr>
                    <td style="padding:10px; border:1px solid #ddd;">抱怨作业多</td>
                    <td style="padding:10px; border:1px solid #ddd;">畏难情绪</td>
                    <td style="padding:10px; border:1px solid #ddd;">分解任务，降低难度</td>
                </tr>
                <tr>
                    <td style="padding:10px; border:1px solid #ddd;">总是犯困</td>
                    <td style="padding:10px; border:1px solid #ddd;">睡眠不足</td>
                    <td style="padding:10px; border:1px solid #ddd;">调整作息时间</td>
                </tr>
            </table>
            
            <h2>策略7：家长要做对的事</h2>
            <h3>✅ 应该做的：</h3>
            <ul>
                <li>陪伴但不代劳</li>
                <li>鼓励努力过程，不只是结果</li>
                <li>保持耐心，控制情绪</li>
                <li>与老师保持沟通</li>
                <li>树立榜样（家长自己也阅读学习）</li>
            </ul>
            
            <h3>❌ 避免做的：</h3>
            <ul>
                <li>不停催促（"快点！"）</li>
                <li>拿孩子和别人比较</li>
                <li>威胁惩罚</li>
                <li>全程盯着，给孩子压力</li>
                <li>孩子一求助就立即给答案</li>
            </ul>
            
            <h2>特别提醒</h2>
            <p>如果孩子长期严重拖拉，可能需要考虑：</p>
            <ul>
                <li>是否有学习障碍（如阅读障碍、注意力缺陷）</li>
                <li>是否对特定学科有恐惧心理</li>
                <li>作业量是否真的过大</li>
                <li>是否需要专业的学习指导</li>
            </ul>
            
            <h2>总结</h2>
            <p>解决写作业拖拉问题没有一蹴而就的方法，需要家长的耐心、智慧和一致性。记住，我们的目标是培养孩子终身学习的能力，而不只是完成今天的作业。</p>
        `,
        image: '📝',
        date: '2024-05-10',
        views: 4532,
        comments: 89
    },
    {
        id: 6,
        title: '如何培养孩子的专注力？科学方法大揭秘',
        category: 'psychology',
        categoryName: '儿童心理',
        excerpt: '专注力是孩子学习的基础能力。本文介绍脑科学原理和实用训练方法，帮助孩子提升专注力...',
        content: `
            <div class="article-info">
                <span>📅 2024-05-08</span>
                <span>👁️ 2,987 阅读</span>
                <span>💬 56 评论</span>
            </div>
            <h1>如何培养孩子的专注力？科学方法大揭秘</h1>
            <p>专注力是孩子学习的基础能力。但很多家长发现，孩子坐不住、容易分心、做事三分钟热度。这正常吗？如何科学培养专注力？</p>
            
            <h2>专注力的发展规律</h2>
            <p>首先要知道，专注力是随着年龄逐渐发展的：</p>
            <ul>
                <li><strong>2-3岁</strong>：5-10分钟</li>
                <li><strong>4-5岁</strong>：10-15分钟</li>
                <li><strong>6-7岁</strong>：15-20分钟</li>
                <li><strong>8岁以上</strong>：20-30分钟</li>
            </ul>
            <p>所以，要求幼儿园孩子专注半小时是不现实的。</p>
            
            <h2>影响专注力的因素</h2>
            <h3>生理因素</h3>
            <ul>
                <li><strong>睡眠</strong>：睡眠不足严重影响专注力</li>
                <li><strong>营养</strong>：缺铁、缺锌会影响大脑功能</li>
                <li><strong>运动</strong>：适量运动促进大脑血液循环</li>
                <li><strong>屏幕时间</strong>：过多屏幕时间会损害专注力</li>
            </ul>
            
            <h3>环境因素</h3>
            <ul>
                <li>环境嘈杂</li>
                <li>玩具太多</li>
                <li>频繁被打扰</li>
                <li>学习区不固定</li>
            </ul>
            
            <h2>专注力训练方法</h2>
            <h3>1. 舒尔特方格</h3>
            <p>经典专注力训练工具：</p>
            <ol>
                <li>在纸上画出5×5的方格</li>
                <li>填入1-25的数字（打乱顺序）</li>
                <li>让孩子按顺序找出1-25</li>
                <li>记录时间，每天练习</li>
            </ol>
            <p>正常水平：5-6岁30-40秒，7-8岁20-30秒。</p>
            
            <h3>2. 听指令做动作</h3>
            <p>训练听觉专注力：</p>
            <ul>
                <li>听到水果拍手</li>
                <li>听到动物跺脚</li>
                <li>听到颜色摸头</li>
            </ul>
            <p>可以逐渐增加指令复杂度。</p>
            
            <h3>3. 找不同/找相同</h3>
            <p>视觉专注力训练：</p>
            <ul>
                <li>找不同游戏</li>
                <li>迷宫游戏</li>
                <li>拼图游戏</li>
                <li>连线游戏</li>
            </ul>
            
            <h3>4. 正念练习</h3>
            <p>适合年龄较大的孩子：</p>
            <ol>
                <li>闭上眼睛，深呼吸</li>
                <li>专注于呼吸的感觉</li>
                <li>思绪飘走时，温柔地带回来</li>
                <li>从1分钟开始，逐渐延长</li>
            </ol>
            
            <h3>5. 阅读训练</h3>
            <p>阅读是最好的专注力训练：</p>
            <ul>
                <li>从绘本开始，逐步过渡到文字书</li>
                <li>每天固定阅读时间</li>
                <li>读完后简单复述内容</li>
                <li>家长陪伴阅读，营造氛围</li>
            </ul>
            
            <h2>日常生活中的专注力培养</h2>
            <h3>✅ 应该做的：</h3>
            <ul>
                <li><strong>一次只做一件事</strong>：不要同时给多个指令</li>
                <li><strong>减少干扰</strong>：学习时关掉电视、收起玩具</li>
                <li><strong>尊重专注时刻</strong>：孩子专注玩耍时不要打断</li>
                <li><strong>保证运动时间</strong>：每天1-2小时户外活动</li>
                <li><strong>建立规律作息</strong>：固定的生活节奏有助于专注力</li>
            </ul>
            
            <h3>❌ 避免做的：</h3>
            <ul>
                <li>频繁打断孩子（即使是"好意"的关心）</li>
                <li>给孩子太多玩具（选择过多会分散注意力）</li>
                <li>长时间使用电子产品</li>
                <li>过度安排课外活动</li>
                <li>在孩子专注时大声说话</li>
            </ul>
            
            <h2>游戏推荐</h2>
            <p>通过游戏培养专注力：</p>
            <ul>
                <li><strong>积木搭建</strong>：培养持续专注</li>
                <li><strong>棋类游戏</strong>：培养策略性专注</li>
                <li><strong>乐器学习</strong>：培养听觉专注</li>
                <li><strong>绘画手工</strong>：培养视觉专注</li>
                <li><strong>乐高搭建</strong>：培养精细动作专注</li>
            </ul>
            
            <h2>何时需要专业帮助</h2>
            <p>如果孩子出现以下情况，建议咨询专业人士：</p>
            <ul>
                <li>注意力严重不集中，影响学习和生活</li>
                <li>伴随多动、冲动行为</li>
                <li>情绪控制困难</li>
                <li>与同龄人相比差异明显</li>
            </ul>
            
            <h2>总结</h2>
            <p>专注力是可以培养的，但需要时间和耐心。最重要的是创造一个有利于专注的环境，尊重孩子的发展节奏，通过有趣的方式逐步提升。记住，每个孩子都是独特的，找到适合自己孩子的方法最重要。</p>
        `,
        image: '🎯',
        date: '2024-05-08',
        views: 2987,
        comments: 56
    }
];

// 分类信息
const categoryNames = {
    all: '全部',
    education: '教育方法',
    psychology: '儿童心理',
    habits: '习惯培养',
    games: '亲子游戏'
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
    renderArticlePreviews();
    renderArticleList();
    updateUserCount();
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

// ===== 页面切换 =====
function showPage(page) {
    currentPage = page;
    
    // 隐藏所有页面
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('blogPage').style.display = 'none';
    document.getElementById('aboutPage').style.display = 'none';
    
    // 显示目标页面
    document.getElementById(page + 'Page').style.display = 'block';
    
    // 更新导航按钮状态
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === page) {
            btn.classList.add('active');
        }
    });
    
    // 滚动到顶部
    window.scrollTo(0, 0);
    
    // 如果是博客页面，确保显示文章列表
    if (page === 'blog') {
        document.getElementById('articleList').style.display = 'grid';
        document.getElementById('articleDetail').style.display = 'none';
    }
}

// ===== 广告追踪 =====
function trackAdClick(product) {
    console.log('广告点击：' + product);
    // 这里可以添加实际的追踪代码
    alert('感谢您的关注！"' + product + '" 推广链接即将上线');
}

// ===== 用户数量更新 =====
function updateUserCount() {
    // 模拟用户数量增长
    const baseCount = 1234;
    const randomIncrease = Math.floor(Math.random() * 100);
    document.getElementById('userCount').textContent = (baseCount + randomIncrease).toLocaleString();
}

// ===== 博客功能 =====
function renderArticlePreviews() {
    const container = document.getElementById('articlePreviewList');
    const previewArticles = blogArticles.slice(0, 3);
    
    container.innerHTML = previewArticles.map(article => `
        <div class="article-preview-card" onclick="showArticleDetail(${article.id})">
            <span class="article-category">${article.categoryName}</span>
            <h4 class="article-title">${article.title}</h4>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-meta">
                <span>📅 ${article.date}</span>
                <span>👁️ ${article.views}</span>
            </div>
        </div>
    `).join('');
}

function renderArticleList() {
    const container = document.getElementById('articleList');
    
    const filteredArticles = currentArticleCategory === 'all' 
        ? blogArticles 
        : blogArticles.filter(a => a.category === currentArticleCategory);
    
    container.innerHTML = filteredArticles.map(article => `
        <div class="article-card" onclick="showArticleDetail(${article.id})">
            <div class="article-image">${article.image}</div>
            <div class="article-content">
                <span class="article-category">${article.categoryName}</span>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span>📅 ${article.date}</span>
                    <span>👁️ ${article.views} 阅读</span>
                    <span>💬 ${article.comments} 评论</span>
                </div>
            </div>
        </div>
    `).join('');
}

function filterArticles(category) {
    currentArticleCategory = category;
    
    // 更新分类按钮状态
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    renderArticleList();
}

function showArticleDetail(articleId) {
    const article = blogArticles.find(a => a.id === articleId);
    if (!article) return;
    
    // 隐藏文章列表，显示详情
    document.getElementById('articleList').style.display = 'none';
    document.getElementById('articleDetail').style.display = 'block';
    
    // 渲染文章内容
    document.getElementById('articleContent').innerHTML = article.content;
    
    // 渲染相关文章
    renderRelatedArticles(articleId);
    
    // 滚动到顶部
    window.scrollTo(0, 0);
}

function backToArticleList() {
    document.getElementById('articleList').style.display = 'grid';
    document.getElementById('articleDetail').style.display = 'none';
    window.scrollTo(0, 0);
}

function renderRelatedArticles(currentId) {
    const relatedContainer = document.getElementById('relatedList');
    
    // 获取3篇相关文章（排除当前文章）
    const related = blogArticles
        .filter(a => a.id !== currentId)
        .slice(0, 3);
    
    relatedContainer.innerHTML = related.map(article => `
        <div class="related-card" onclick="showArticleDetail(${article.id})">
            <div class="related-title">${article.title}</div>
            <div class="related-category">${article.categoryName}</div>
        </div>
    `).join('');
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
        learningThreshold: 50,
        hasShownLearning: false
    };
    
    appData.children.push(child);
    appData.currentChildId = child.id;
    saveData();
    
    closeModal('addChildModal');
    renderChildrenList();
    showChildDetail(child.id);
    
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
    
    document.getElementById('childAvatar').textContent = child.avatar;
    document.getElementById('childName').textContent = child.name;
    document.getElementById('childPoints').textContent = child.points;
    
    updateMoodSelector(child.mood);
    renderRewardsList(child);
    renderHistoryList(child);
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
    
    const pointsElement = document.getElementById('childPoints');
    pointsElement.classList.add('celebration');
    setTimeout(() => pointsElement.classList.remove('celebration'), 500);
    
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
    
    child.mood = 'excited';
    
    saveData();
    closeModal('confirmExchangeModal');
    appData.pendingExchange = null;
    updateUI();
    
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
    
    if (child.points >= child.learningThreshold && child.mood === 'excited') {
        section.style.display = 'block';
        
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
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.show').forEach(modal => {
            modal.classList.remove('show');
        });
    }
});
