export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featured?: boolean;
  content: {
    heading?: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
};

export const blogs: BlogPost[] = [
  {
    slug: "how-to-track-calories",
    title: "How to Track Calories Effectively for Your Goals",
    excerpt:
      "Learn the basics of calorie tracking, daily targets, meal logging, and how to make calorie tracking part of your everyday routine.",
    category: "Nutrition",
    readTime: "6 min read",
    date: "2026-09-20",
    featured: true,

    content: [
      {
        paragraphs: [
          "Calorie tracking can help you understand how much energy you are consuming throughout the day. The goal is not to make every meal complicated, but to create a consistent picture of your eating habits.",
          "A useful calorie-tracking routine starts with understanding your approximate daily energy needs and then consistently recording the foods and drinks you consume.",
        ],
      },

      {
        heading: "Start with a daily calorie target",
        paragraphs: [
          "Your calorie target can depend on factors such as age, sex, height, weight, activity level, and your personal goal.",
          "A target gives your daily food choices some context, but it should be treated as an estimate rather than an exact measurement of your body's energy requirements.",
        ],
      },

      {
        heading: "Record your meals consistently",
        paragraphs: [
          "The most useful calorie log is usually the one you can maintain consistently. Record your main meals, snacks, drinks, and other foods that contribute meaningful calories.",
        ],

        bullets: [
          "Record breakfast, lunch, dinner, and snacks.",
          "Pay attention to portion sizes.",
          "Include drinks and sauces where relevant.",
          "Try to log meals close to when you eat them.",
        ],
      },

      {
        heading: "Look at trends instead of one day",
        paragraphs: [
          "One unusually high or low calorie day does not tell you everything about your nutrition. Reviewing your data across multiple days can provide more useful context.",
        ],
      },
    ],
  },

  {
    slug: "protein-intake-guide",
    title: "Protein Intake: A Simple Guide for Everyday Nutrition",
    excerpt:
      "Understand why protein matters, how to track it, and how to include protein-rich foods in your everyday meals.",
    category: "Protein",
    readTime: "7 min read",
    date: "2026-09-17",

    content: [
      {
        paragraphs: [
          "Protein is one of the three major macronutrients and plays an important role in everyday nutrition. Tracking protein can help you understand whether your meals regularly contain protein-rich foods.",
        ],
      },

      {
        heading: "What foods contain protein?",
        paragraphs: [
          "Protein can come from both animal and plant sources. The right choices depend on your dietary preferences, allergies, availability, and overall nutrition goals.",
        ],

        bullets: [
          "Eggs",
          "Chicken and other meats",
          "Fish",
          "Milk and dairy products",
          "Paneer",
          "Dal and lentils",
          "Beans and legumes",
          "Soy-based foods",
        ],
      },

      {
        heading: "Spread protein across your meals",
        paragraphs: [
          "Instead of thinking about protein only at dinner, consider how your breakfast, lunch, snacks, and dinner contribute to your overall daily intake.",
        ],
      },

      {
        heading: "Track your actual meals",
        paragraphs: [
          "Food portions and preparation methods can change nutritional values. Tracking the foods and portions you actually consume provides more useful information than relying only on general food lists.",
        ],
      },
    ],
  },

  {
    slug: "indian-food-calorie-guide",
    title: "Indian Food Calories: How to Track Everyday Indian Meals",
    excerpt:
      "From roti and rice to dal, paneer and mixed dishes, learn how to approach calorie tracking when eating everyday Indian food.",
    category: "Indian Food",
    readTime: "8 min read",
    date: "2026-09-14",

    content: [
      {
        paragraphs: [
          "Indian meals can contain multiple ingredients, preparation methods, sauces, oils, and serving sizes. This makes calorie tracking different from tracking a simple packaged food.",
        ],
      },

      {
        heading: "Start with the individual components",
        paragraphs: [
          "When possible, break a meal into its major components. For example, a meal could contain roti, dal, vegetables, paneer, rice, and a side dish.",
        ],
      },

      {
        heading: "Portion size matters",
        paragraphs: [
          "Two meals with the same food names can have very different calorie values depending on portion size and preparation.",
        ],

        bullets: [
          "Number and size of rotis",
          "Amount of cooked rice",
          "Amount of oil or ghee",
          "Quantity of paneer or meat",
          "Serving size of dal",
          "Ingredients used in gravies",
        ],
      },

      {
        heading: "Use estimates consistently",
        paragraphs: [
          "Nutrition tracking does not always require perfect precision. Consistent estimates can still help you understand patterns in your diet, especially when you use similar methods over time.",
        ],
      },
    ],
  },

  {
    slug: "benefits-of-meal-tracking",
    title: "5 Benefits of Keeping a Consistent Meal Log",
    excerpt:
      "A meal log can reveal eating patterns that are difficult to notice from memory alone.",
    category: "Meal Tracking",
    readTime: "5 min read",
    date: "2026-09-10",

    content: [
      {
        paragraphs: [
          "Writing down what you eat creates a record that you can review later. This can make your eating habits more visible and easier to understand.",
        ],
      },

      {
        heading: "1. Better awareness",
        paragraphs: [
          "A meal log can show how frequently you eat, what foods appear most often, and where snacks or drinks fit into your day.",
        ],
      },

      {
        heading: "2. Understand your nutrition",
        paragraphs: [
          "Tracking can help you see calories, protein, carbohydrates, fat, and fiber together instead of focusing on a single number.",
        ],
      },

      {
        heading: "3. Identify patterns",
        paragraphs: [
          "Looking at several days of meals can reveal patterns that are difficult to remember accurately.",
        ],
      },

      {
        heading: "4. Make informed adjustments",
        paragraphs: [
          "Once you understand your current routine, you can decide which habits you want to change.",
        ],
      },

      {
        heading: "5. Build consistency",
        paragraphs: [
          "The long-term value of tracking comes from building a sustainable routine rather than trying to create a perfect food log every day.",
        ],
      },
    ],
  },

  {
    slug: "understanding-calorie-deficit",
    title: "Understanding Calorie Deficit in Simple Terms",
    excerpt:
      "Learn what a calorie deficit means and why your overall energy balance matters when tracking nutrition.",
    category: "Weight Management",
    readTime: "6 min read",
    date: "2026-09-06",

    content: [
      {
        paragraphs: [
          "A calorie deficit generally means consuming less energy from food and drinks than your body uses over a period of time.",
        ],
      },

      {
        heading: "Why the concept matters",
        paragraphs: [
          "Energy balance is one factor involved in changes in body weight. However, real-world weight changes can also be affected by water, digestion, activity, and other factors.",
        ],
      },

      {
        heading: "Use tracking as information",
        paragraphs: [
          "A calorie tracker can help you understand your estimated intake and activity. It should not be treated as a guarantee of a specific amount of weight change.",
        ],
      },

      {
        heading: "Focus on sustainable habits",
        paragraphs: [
          "Consistent meals, adequate nutrition, activity, sleep, and a sustainable routine are generally more useful than trying to make extreme short-term changes.",
        ],
      },
    ],
  },

  {
    slug: "how-ai-food-scanner-works",
    title: "How an AI Food Scanner Can Make Meal Logging Faster",
    excerpt:
      "Explore how image-based food analysis can assist with meal logging and why AI estimates should still be reviewed.",
    category: "AI & Nutrition",
    readTime: "6 min read",
    date: "2026-09-02",

    content: [
      {
        paragraphs: [
          "AI food scanning can reduce the amount of manual information you need to enter when recording a meal. Instead of starting with a blank form, an image can provide a starting point for food identification.",
        ],
      },

      {
        heading: "How image analysis works",
        paragraphs: [
          "An AI system can analyze an uploaded image and attempt to identify visible foods. Based on the detected foods and other information, the system may generate estimated nutrition values.",
        ],
      },

      {
        heading: "Why estimates need review",
        paragraphs: [
          "A photo cannot always reveal ingredients, exact portion sizes, cooking methods, or hidden ingredients. For that reason, AI-generated nutrition information should be reviewed before saving.",
        ],
      },

      {
        heading: "AI should assist, not replace your judgment",
        paragraphs: [
          "The purpose of an AI food scanner is to make logging faster. You should remain able to edit detected foods and nutrition information when the estimate does not match your actual meal.",
        ],
      },
    ],
  },
];