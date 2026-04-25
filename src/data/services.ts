
import { Scissors, Ruler, Shirt, Sparkles, Star, Users, CheckCircle2 } from "lucide-react";
import React from "react";

export interface Service {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    iconName: "Scissors" | "Ruler" | "Shirt" | "Sparkles" | "Star" | "Users" | "CheckCircle2";
    features: string[];
    image: string; // Placeholder for now
}

export const servicesData: Service[] = [
    {
        id: "1",
        slug: "hajj-umrah-ihram",
        title: "إحرامات حج وعمرة",
        shortDescription: "تصميم وتنفيذ ملابس إحرام وصلاة مريحة، تراعي الخصوصية وتوفر لكِ الراحة التامة لأداء المناسك.",
        fullDescription: "نتميز بتقديم خدمة تفصيل ملابس الإحرام للحج والعمرة بمواصفات خاصة تراعي الراحة والستر. نستخدم أفضل أنواع الأقمشة القطنية الطبيعية التي تتناسب مع الأجواء الحارة، مع تصميمات عملية تسهل الحركة وتوفر الراحة القصوى أثناء أداء المناسك. نهتم بأدق التفاصيل مثل الجيوب المخفية والسحابات المتينة لضمان رحلة مريحة وآمنة.",
        iconName: "Sparkles",
        features: [
            "أقمشة قطنية 100% باردة ومريحة",
            "تصاميم ساترة وعملية",
            "جيوب مخفية للأغراض الشخصية",
            "مقاسات متنوعة ومناسبة للجميع",
            "خياطة مزدوجة لمتانة أكبر"
        ],
        image: "/siteimages/download (47).webp",
        gallery: ["/siteimages/download (47).webp", "/siteimages/download (46).webp", "/siteimages/download (45).webp"],
        duration: "3-5 أيام",
        pricing: "تبدأ من 150 ريال",
        showPricing: true
    },
    {
        id: "2",
        slug: "jalabiyas",
        title: "خياطة الجلابيات",
        shortDescription: "تشكيلة واسعة من الجلابيات العصرية والتقليدية، نصممها بذوق رفيع يناسب جميع الأذواق والمناسبات.",
        fullDescription: "نقدم لكِ عالماً من الجلابيات التي تجمع بين أصالة التراث ولمسات الموضة العصرية. سواء كنتِ تبحثين عن جلابية يومية مريحة لاستقبال الضيوف، أو جلابية فخمة للمناسبات الخاصة، فإننا في خياطة رواء نضمن لكِ تصميماً فريداً ينفذ بدقة متناهية. نساعدك في اختيار الأقمشة والتطريزات التي تبرز جمالك.",
        iconName: "Shirt",
        features: [
            "تصاميم حصرية وعصرية",
            "تطريز يدوي وآلي دقيق",
            "تنوع في الأقمشة والخامات",
            "قصات تناسب جميع أشكال الجسم",
            "إمكانية تنفيذ تصاميم حسب الطلب"
        ],
        image: "/siteimages/5151.webp",
        gallery: ["/siteimages/5151.webp", "/siteimages/download.webp", "/siteimages/download (47).webp"],
        duration: "5-7 أيام",
        pricing: "تبدأ من 250 ريال",
        showPricing: true
    },
    {
        id: "3",
        slug: "alterations",
        title: "تعديل الملابس",
        shortDescription: "خدمات احترافية لتعديل المقاسات، التقصير، والتضييق لتبدو ملابسك وكأنها صممت خصيصاً لكِ.",
        fullDescription: "لا داعي للقلق بشأن الملابس التي لا تناسب مقاسك تماماً. نقدم خدمة التعديلات الاحترافية التي تشمل تضييق، توسيع، تقصير، وتغيير القصات. نتعامل مع كافة أنواع الأقمشة بما فيها السواريه والملابس المطرزة بحرفية عالية تضمن عدم تأثر التصميم الأصلي للقطعة. نعيد لملابسك رونقها لتناسبك بشكل مثالي.",
        iconName: "Ruler",
        features: [
            "دقة متناهية في أخذ المقاسات",
            "الحفاظ على تفاصيل القطعة الأصلية",
            "تعديل فساتين السهرة والزفاف",
            "تقصير وتضييق البنطلونات والتنانير",
            "إصلاح السحابات والأزرار"
        ],
        image: "/siteimages/download (46).webp",
        gallery: ["/siteimages/download (46).webp", "/siteimages/download (45).webp", "/siteimages/download (47).webp"],
        duration: "1-2 يوم",
        pricing: "تبدأ من 30 ريال",
        showPricing: true
    },
    {
        id: "4",
        slug: "comprehensive-sewing",
        title: "خياطة نسائية شاملة",
        shortDescription: "متخصصون في تنفيذ كافة الأزياء النسائية بخبرة تمتد لأكثر من 10 سنوات في كبرى المصانع.",
        fullDescription: "خبرتنا الطويلة تمكننا من تنفيذ كافة موديلات الملابس النسائية من الفساتين الناعمة، التايورات الرسمية، القمصان، والتنانير. نلتزم بأعلى معايير الجودة في التشطيب والقص، مستخدمين تقنيات الخياطة الحديثة لضمان نتيجة تضاهي الماركات العالمية. حلمك بالتصميم الذي في خيالك سيصبح حقيقة ملموسة بين يديك.",
        iconName: "Scissors",
        features: [
            "خبرة أكثر من 10 سنوات",
            "تنفيذ كافة التصاميم من الصور",
            "بطانات وتشطيبات عالية الجودة",
            "استشارات في اختيار الموديل والقماش",
            "بروفات متعددة لضمان الرضا التام"
        ],
        image: "/siteimages/download.webp",
        gallery: ["/siteimages/download.webp", "/siteimages/5151.webp", "/siteimages/download (46).webp"],
        duration: "7-10 أيام",
        pricing: "حسب الموديل",
        showPricing: true
    },
    {
        id: "5",
        slug: "uniforms",
        title: "زي موحد",
        shortDescription: "تصميم وتنفيذ زي موحد للشركات والمدارس بجودة عالية وخامات عملية تتحمل الاستخدام اليومي.",
        fullDescription: "نقدم حلولاً متكاملة للزي الموحد (اليونيفورم) للمدارس، المستشفيات، الصالونات، والشركات. نركز على اختيار خامات عملية تتحمل الغسيل والاستخدام المتكرر مع الحفاظ على مظهر أنيق ومرتب. نوفر خدمات التطريز للشعارات والأسماء لتعزيز هوية مؤسستك.",
        iconName: "Users",
        features: [
            "خامات قوية وعملية",
            "تصاميم مريحة للعمل الطويل",
            "تطريز شعارات المؤسسات",
            "أسعار خاصة للكميات",
            "سرعة في التنفيذ والتسليم"
        ],
        image: "/siteimages/download (45).webp",
        gallery: ["/siteimages/download (45).webp", "/siteimages/download (46).webp", "/siteimages/download (47).webp"],
        duration: "10-14 يوم",
        pricing: "أسعار خاصة للجملة",
        showPricing: true
    }
];
