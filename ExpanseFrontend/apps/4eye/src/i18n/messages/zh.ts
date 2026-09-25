import type { Translations } from "../types"

const zh: Translations = {
  common: {
    navigation: {
      home: "首页",
      contact: "联系我们",
      terms: "服务条款",
      privacyPolicy: "隐私政策",
    },
    actions: {
      submit: "提交",
      cancel: "取消",
      learnMore: "了解更多",
      getStarted: "开始使用",
      contactUs: "联系我们",
    },
    footer: {
      copyright: "© {year} Expanse EDU",
      allRightsReserved: "保留所有权利。",
    },
  },
  home: {
    intro: {
      title: "释放学生潜能",
      body: "Expanse为我们的学生、教师和家庭提供现代化工具和技术，将教育提升到新的水平。",
    },
    purpose: {
      title: "我们的使命",
      items: [
        {
          label: "点燃学习热情",
          description: "让教育变得有趣和吸引人，让学生每天都期待上学。",
        },
        {
          label: "提升参与度",
          description: "通过游戏化使现有课堂环境更具吸引力。",
        },
        {
          label: "提高学业表现",
          description:
            "释放学生潜能，激励学生尽其所能，同时提高学习理解力和信息保留率。",
        },
        {
          label: "改善出勤率",
          description: "创造学生喜爱的学习环境，同时鼓励规律出勤。",
        },
        {
          label: "最大化学习效果",
          description: "Expanse提升动力和参与度，带来更深入的学习和记忆。",
        },
        {
          label: "促进学生身心健康",
          description: "为所有人培养积极和支持性的环境。",
        },
      ],
    },
    problemSolutionStory: [
      {
        title: "参与度，提升。",
        paragraphs: [
          "**在即时满足的世界中，教育的回报似乎遥远而抽象。**我们正在与即时快感的诱惑、点赞带来的多巴胺冲击和现代娱乐竞争。",
          "**Expanse为您提供反击的工具。**",
        ],
      },
      {
        title: "成就感，实现。",
        paragraphs: [
          "**空荡荡的课桌讲述着未满足需求的故事。**当学生难以集中注意力、缺乏目标感，或面临心理、情感或身体健康挑战时，学校就变成了战场，而不是学习的地方。",
          "**Expanse赋能学生集中注意力，发现目标，重新发现学习的乐趣。**",
        ],
      },
      {
        title: "进步与潜力，可视化。",
        paragraphs: [
          "**被怀疑笼罩的心灵无法翱翔。**对自己的负面信念会剪断潜力的翅膀。我们必须培养自信，让学生看到他们内在的无限可能。",
          "**Expanse帮助学生认识自己的成长和潜力，并相信自己成功的能力。**",
        ],
      },
    ],
    advantages: {
      title: "我们的优势",
      items: [
        {
          label: "全面参与",
          description:
            "我们的游戏化策略旨在吸引所有学生，无论其背景或技能水平如何。",
        },
        {
          label: "教师赋能",
          description:
            "我们为教师提供工具，轻松将游戏化融入现有课程。",
        },
        {
          label: "数据驱动洞察",
          description:
            "实时分析帮助教育者了解学生参与度并相应调整策略。",
        },
        {
          label: "无缝集成",
          description: "我们的平台与现有学校管理系统集成，便于采用。",
        },
      ],
    },
    audience: {
      title: "我们服务的对象",
      body: "我们与致力于通过创新技术解决方案改善学生参与度和成果的K-12学校、学区和教育机构合作。",
    },
    additionalGoals: {
      title: "我们的目标",
      details: [
        {
          label: "提高学生参与度",
          body: "通过基于游戏的激励措施提升课堂参与度和学习热情。",
        },
        {
          label: "改善学业成果",
          body: "推动成绩、考试分数和学习保留率的可衡量改进。",
        },
        {
          label: "支持教育者成功",
          body: "为教师提供强大的工具，增强而非复杂化他们的教学体验。",
        },
      ],
    },
    gamificationEngagement: {
      title: "有效的游戏化",
      body: "将您的课堂转变为一场引人入胜的冒险，每一个成就都很重要。",
      animation: {
        left: "学习",
        right: "成长",
        center: ["游戏", "获得", "升级"],
      },
    },
    curtains: {
      title: "准备好改变教育了吗？",
      body: "加入已经看到Expanse EDU成果的学校。",
    },
    contact: {
      title: "联系我们",
      buttonText: "联系我们",
    },
    thankYou: {
      text: "感谢您对Expanse EDU的关注！",
    },
  },
  contact: {
    pageTitle: "联系我们",
    form: {
      name: "您的姓名",
      email: "电子邮箱",
      message: "您的留言",
      submit: "发送消息",
    },
    success: {
      title: "消息已发送！",
      message: "我们会尽快与您联系。",
    },
    error: {
      title: "出了点问题",
      message: "请重试或直接发送电子邮件给我们。",
    },
  },
}

export default zh
