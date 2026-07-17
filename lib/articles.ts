import type { ProductShape } from "@/components/ProductArt";
export type Article={slug:string;category:string;title:string;excerpt:string;date:string;time:string;shape:ProductShape};
export const articles:Article[]=[
{slug:"kak-vybrat-plastinu",category:"Остеосинтез",title:"Как выбрать пластину для остеосинтеза у собак и кошек",excerpt:"Разбираем основные типы пластин, материалы, формы и критерии выбора для разных случаев.",date:"12 мая 2024",time:"7 мин чтения",shape:"tplate"},
{slug:"vinty-pravila-podbora",category:"Импланты",title:"Винты для остеосинтеза: основные правила подбора",excerpt:"Диаметр, длина, тип резьбы и материал — что важно учитывать при выборе винтов.",date:"28 апреля 2024",time:"6 мин чтения",shape:"screw"},
{slug:"klinicheskiy-sluchay",category:"Клинические случаи",title:"Клинический случай: сложный перелом большеберцовой кости у собаки",excerpt:"Пошаговый разбор лечения и остеосинтеза с использованием L-образной пластины.",date:"18 апреля 2024",time:"9 мин чтения",shape:"lplate"},
{slug:"instrumenty",category:"Инструменты",title:"Необходимые инструменты для остеосинтеза",excerpt:"Базовый набор инструментов, который должен быть в каждой ветеринарной клинике.",date:"5 апреля 2024",time:"6 мин чтения",shape:"set"},
{slug:"posleoperacionnyj-uhod",category:"Уход и реабилитация",title:"Послеоперационный уход после остеосинтеза: что важно знать",excerpt:"Рекомендации по уходу, ограничению нагрузки и контролю за восстановлением животного.",date:"22 марта 2024",time:"8 мин чтения",shape:"tool"},
{slug:"novoe-postuplenie",category:"Новости",title:"Новое поступление имплантов и инструментов",excerpt:"Расширили ассортимент пластин, винтов и инструментов на складе в Воронеже.",date:"15 марта 2024",time:"3 мин чтения",shape:"set"},
{slug:"osteosintez-u-koshek",category:"Остеосинтез",title:"Особенности остеосинтеза у кошек",excerpt:"Анатомические нюансы и подходы к фиксации костей у кошек.",date:"1 марта 2024",time:"7 мин чтения",shape:"plate"},
{slug:"titan-ili-stal",category:"Импланты",title:"Материалы имплантов: титан или нержавеющая сталь?",excerpt:"Сравнение материалов, их преимуществ и особенностей применения.",date:"20 февраля 2024",time:"6 мин чтения",shape:"tplate"},
{slug:"vozvrashchenie-k-aktivnosti",category:"Клинические случаи",title:"История пациента: возвращение к активной жизни после остеосинтеза",excerpt:"Реальный кейс и результат лечения сложного перелома плечевой кости.",date:"10 февраля 2024",time:"5 мин чтения",shape:"lplate"},
];
export const articleBySlug=(slug:string)=>articles.find(a=>a.slug===slug);
