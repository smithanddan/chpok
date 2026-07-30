import svgPaths from "./svg-dp67bskt1b";
import imgVideo from "./103cd38c82b107a3298131809ac7c917918cc817.png";
import imgLandingFooter from "./0d8c40d853eed5a06d295bd05b57aada891d63d3.png";

function NotificationsF() {
  return <div className="h-0 shrink-0 w-full" data-name="Notifications (F8)" />;
}

function Heading1() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[30px] left-[405.41px] not-italic text-[#0c0c0d] text-[22.5px] text-center top-[0.5px] tracking-[-0.45px] whitespace-nowrap">О сервисе</p>
    </div>
  );
}

function Video() {
  return (
    <div className="h-[454.5px] relative shrink-0 w-full" data-name="Video">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[rgba(234,236,241,0.3)] inset-0" />
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgVideo} />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white h-[456.5px] relative rounded-[13.375px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative size-full">
          <Video />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.6)] border-solid inset-0 pointer-events-none rounded-[13.375px] shadow-[0px_10px_15px_-3px_rgba(26,101,199,0.05),0px_4px_6px_-4px_rgba(26,101,199,0.05)]" />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[516.5px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[30px] items-start px-[15px] relative size-full">
        <Heading1 />
        <Container1 />
      </div>
    </div>
  );
}

function LandingVideoSection() {
  return (
    <div className="absolute bg-[#f2f4f7] content-stretch flex flex-col h-[637.5px] items-start left-0 pb-px pt-[60px] px-[314px] top-[945.5px] w-[1468px]" data-name="LandingVideoSection">
      <div aria-hidden="true" className="absolute border-[rgba(225,229,234,0.4)] border-b border-solid inset-0 pointer-events-none" />
      <Container />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[75px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[37.5px] left-[315px] not-italic text-[#0c0c0d] text-[33.75px] text-center top-px tracking-[-0.8438px] w-[630px]">Всё необходимое для контроля автопарка</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[52.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[26.25px] left-[315px] not-italic text-[#5b6471] text-[16.875px] text-center top-0 w-[630px]">Три ключевых направления мониторинга в едином интерфейсе с автоматическими уведомлениями и подробной аналитикой.</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] h-[142.5px] items-start left-[385px] top-0 w-[630px]" data-name="Container">
      <Heading2 />
      <Paragraph />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[22.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
        <g id="Icon">
          <path d={svgPaths.pe78d940} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          <path d={svgPaths.p12e3b980} id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          <path d={svgPaths.p2c40dae0} id="Vector_3" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
        </g>
      </svg>
    </div>
  );
}

function FeaturesSection1() {
  return (
    <div className="absolute bg-[rgba(26,101,199,0.1)] content-stretch flex items-center justify-center left-[22.5px] px-[11.25px] rounded-[9.375px] size-[45px] top-[22.5px]" data-name="FeaturesSection">
      <Icon />
    </div>
  );
}

function CardTitle() {
  return (
    <div className="absolute h-[26.25px] left-[22.5px] top-[88.13px] w-[384.664px]" data-name="CardTitle">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-0 not-italic text-[#0c0c0d] text-[18.75px] top-0 tracking-[-0.4688px] whitespace-nowrap">Мониторинг пропусков</p>
    </div>
  );
}

function CardDescription() {
  return (
    <div className="absolute h-[67.5px] left-[22.5px] top-[120px] w-[384.664px]" data-name="CardDescription">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#5b6471] text-[15px] top-[-0.5px] w-[385px]">Автоматическая проверка статуса пропусков МКАД, ТТК и СК. Уведомления об истечении срока действия и блокировках.</p>
    </div>
  );
}

function CardHeader() {
  return (
    <div className="absolute h-[210px] left-0 top-0 w-[429.664px]" data-name="CardHeader">
      <FeaturesSection1 />
      <CardTitle />
      <CardDescription />
    </div>
  );
}

function Container5() {
  return <div className="absolute bg-[#1a65c7] left-0 rounded-[9999px] size-[5.625px] top-[6.56px]" data-name="Container" />;
}

function ListItem() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-full" data-name="List Item">
      <Container5 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-[13.13px] not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Проверка каждый день</p>
    </div>
  );
}

function Container6() {
  return <div className="absolute bg-[#1a65c7] left-0 rounded-[9999px] size-[5.625px] top-[6.56px]" data-name="Container" />;
}

function ListItem1() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-full" data-name="List Item">
      <Container6 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-[13.13px] not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Уведомления за 14 дней до истечения</p>
    </div>
  );
}

function Container7() {
  return <div className="absolute bg-[#1a65c7] left-0 rounded-[9999px] size-[5.625px] top-[6.56px]" data-name="Container" />;
}

function ListItem2() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-full" data-name="List Item">
      <Container7 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-[13.13px] not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">История изменений статусов</p>
    </div>
  );
}

function FeaturesSection2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.5px] h-[71.25px] items-start left-[22.5px] top-[210px] w-[384.664px]" data-name="FeaturesSection">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-white border border-[rgba(225,229,234,0.5)] border-solid h-[305.75px] left-0 overflow-clip rounded-[15px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.08),0px_2px_4px_-2px_rgba(0,0,0,0.04)] top-0 w-[431.664px]" data-name="Card">
      <CardHeader />
      <FeaturesSection2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[22.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
        <g id="Icon">
          <path d={svgPaths.p2c323980} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          <path d={svgPaths.p380c5c16} id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          <path d={svgPaths.p30021170} id="Vector_3" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          <path d={svgPaths.p21009580} id="Vector_4" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          <path d={svgPaths.pfa3580} id="Vector_5" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
        </g>
      </svg>
    </div>
  );
}

function FeaturesSection3() {
  return (
    <div className="absolute bg-[rgba(26,101,199,0.1)] content-stretch flex items-center justify-center left-[22.5px] px-[11.25px] rounded-[9.375px] size-[45px] top-[22.5px]" data-name="FeaturesSection">
      <Icon1 />
    </div>
  );
}

function CardTitle1() {
  return (
    <div className="absolute h-[26.25px] left-[22.5px] top-[88.13px] w-[384.664px]" data-name="CardTitle">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-0 not-italic text-[#0c0c0d] text-[18.75px] top-0 tracking-[-0.4688px] whitespace-nowrap">Регистрация в РНИС</p>
    </div>
  );
}

function CardDescription1() {
  return (
    <div className="absolute h-[67.5px] left-[22.5px] top-[120px] w-[384.664px]" data-name="CardDescription">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#5b6471] text-[15px] top-[-0.5px] w-[385px]">Контроль регистрации транспорта в Региональной навигационно-информационной системе и подключения БНСО.</p>
    </div>
  );
}

function CardHeader1() {
  return (
    <div className="absolute h-[210px] left-0 top-0 w-[429.664px]" data-name="CardHeader">
      <FeaturesSection3 />
      <CardTitle1 />
      <CardDescription1 />
    </div>
  );
}

function Container8() {
  return <div className="absolute bg-[#1a65c7] left-0 rounded-[9999px] size-[5.625px] top-[6.56px]" data-name="Container" />;
}

function ListItem3() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-full" data-name="List Item">
      <Container8 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-[13.13px] not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Статус регистрации ТС</p>
    </div>
  );
}

function Container9() {
  return <div className="absolute bg-[#1a65c7] left-0 rounded-[9999px] size-[5.625px] top-[6.56px]" data-name="Container" />;
}

function ListItem4() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-full" data-name="List Item">
      <Container9 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-[13.13px] not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Количество подключённых БНСО</p>
    </div>
  );
}

function Container10() {
  return <div className="absolute bg-[#1a65c7] left-0 rounded-[9999px] size-[5.625px] top-[6.56px]" data-name="Container" />;
}

function ListItem5() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-full" data-name="List Item">
      <Container10 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-[13.13px] not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Мгновенные уведомления об ошибках</p>
    </div>
  );
}

function FeaturesSection4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.5px] h-[71.25px] items-start left-[22.5px] top-[210px] w-[384.664px]" data-name="FeaturesSection">
      <ListItem3 />
      <ListItem4 />
      <ListItem5 />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-white border border-[rgba(225,229,234,0.5)] border-solid h-[305.75px] left-[454.16px] overflow-clip rounded-[15px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.08),0px_2px_4px_-2px_rgba(0,0,0,0.04)] top-0 w-[431.664px]" data-name="Card">
      <CardHeader1 />
      <FeaturesSection4 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[22.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.5 22.5">
        <g id="Icon">
          <path d={svgPaths.p2f518580} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
        </g>
      </svg>
    </div>
  );
}

function FeaturesSection5() {
  return (
    <div className="absolute bg-[rgba(26,101,199,0.1)] content-stretch flex items-center justify-center left-[22.5px] px-[11.25px] rounded-[9.375px] size-[45px] top-[22.5px]" data-name="FeaturesSection">
      <Icon2 />
    </div>
  );
}

function CardTitle2() {
  return (
    <div className="absolute h-[26.25px] left-[22.5px] top-[88.13px] w-[384.664px]" data-name="CardTitle">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-0 not-italic text-[#0c0c0d] text-[18.75px] top-0 tracking-[-0.4688px] whitespace-nowrap">Телеметрия</p>
    </div>
  );
}

function CardDescription2() {
  return (
    <div className="absolute h-[67.5px] left-[22.5px] top-[120px] w-[384.664px]" data-name="CardDescription">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#5b6471] text-[15px] top-[-0.5px] w-[385px]">Мониторинг передачи телеметрических данных и онлайн-статуса транспортных средств в реальном времени.</p>
    </div>
  );
}

function CardHeader2() {
  return (
    <div className="absolute h-[210px] left-0 top-0 w-[429.664px]" data-name="CardHeader">
      <FeaturesSection5 />
      <CardTitle2 />
      <CardDescription2 />
    </div>
  );
}

function Container11() {
  return <div className="absolute bg-[#1a65c7] left-0 rounded-[9999px] size-[5.625px] top-[6.56px]" data-name="Container" />;
}

function ListItem6() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-full" data-name="List Item">
      <Container11 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-[13.13px] not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Статус онлайн/оффлайн</p>
    </div>
  );
}

function Container12() {
  return <div className="absolute bg-[#1a65c7] left-0 rounded-[9999px] size-[5.625px] top-[6.56px]" data-name="Container" />;
}

function ListItem7() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-full" data-name="List Item">
      <Container12 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-[13.13px] not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Время последней отметки</p>
    </div>
  );
}

function Container13() {
  return <div className="absolute bg-[#1a65c7] left-0 rounded-[9999px] size-[5.625px] top-[6.56px]" data-name="Container" />;
}

function ListItem8() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-full" data-name="List Item">
      <Container13 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-[13.13px] not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Алерты при потере связи</p>
    </div>
  );
}

function FeaturesSection6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.5px] h-[71.25px] items-start left-[22.5px] top-[210px] w-[384.664px]" data-name="FeaturesSection">
      <ListItem6 />
      <ListItem7 />
      <ListItem8 />
    </div>
  );
}

function Card2() {
  return (
    <div className="absolute bg-white border border-[rgba(225,229,234,0.5)] border-solid h-[305.75px] left-[908.33px] overflow-clip rounded-[15px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.08),0px_2px_4px_-2px_rgba(0,0,0,0.04)] top-0 w-[431.664px]" data-name="Card">
      <CardHeader2 />
      <FeaturesSection6 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[305.75px] left-[30px] top-[202.5px] w-[1340px]" data-name="Container">
      <Card />
      <Card1 />
      <Card2 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[508.25px] relative shrink-0 w-full" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function FeaturesSection() {
  return (
    <div className="absolute bg-[rgba(234,236,241,0.3)] content-stretch flex flex-col h-[718.25px] items-start left-0 pt-[105px] px-[34px] top-[1583px] w-[1468px]" data-name="FeaturesSection">
      <Container2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[15px] size-[15px] top-[7.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p2f69c040} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p24aeb400} id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p28f1f780} id="Vector_3" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p6d4e810} id="Vector_4" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[18.75px] left-[37.5px] top-[5.63px] w-[161.672px]" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18.75px] left-0 not-italic text-[#1a65c7] text-[13.125px] top-[0.5px] whitespace-nowrap">Партнёрская программа</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-[rgba(26,101,199,0.05)] border border-[rgba(26,101,199,0.2)] border-solid h-[32px] left-0 rounded-[9999px] top-0 w-[216.172px]" data-name="Container">
      <Icon3 />
      <Text />
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[37.5px] left-0 top-[54.5px] w-[647.5px]" data-name="Heading 2">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[37.5px] left-0 not-italic text-[#0c0c0d] text-[33.75px] top-px tracking-[-0.8438px] whitespace-nowrap">Станьте нашим партнёром</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[52.5px] left-0 top-[107px] w-[647.5px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[26.25px] left-0 not-italic text-[#5b6471] text-[16.875px] top-0 w-[648px]">Предлагаем выгодные условия для транспортных компаний, интеграторов и сервисных организаций. Расширьте спектр услуг для ваших клиентов.</p>
    </div>
  );
}

function SlotSlotClone() {
  return (
    <div className="absolute bg-[#1a65c7] content-stretch flex h-[45px] items-center justify-center left-0 px-[30px] rounded-[13.375px] top-0 w-[186px]" data-name="Slot.SlotClone">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] not-italic relative shrink-0 text-[15px] text-white whitespace-nowrap">Стать партнёром</p>
    </div>
  );
}

function SlotSlotClone1() {
  return (
    <div className="absolute content-stretch flex h-[45px] items-center justify-center left-[197.25px] px-[31px] py-px rounded-[13.375px] top-0 w-[144.602px]" data-name="Slot.SlotClone">
      <div aria-hidden="true" className="absolute border border-[#e1e5ea] border-solid inset-0 pointer-events-none rounded-[13.375px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] not-italic relative shrink-0 text-[#0c0c0d] text-[15px] whitespace-nowrap">Подробнее</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[45px] left-0 top-[189.5px] w-[647.5px]" data-name="Container">
      <SlotSlotClone />
      <SlotSlotClone1 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[234.5px] left-0 top-[74.13px] w-[647.5px]" data-name="Container">
      <Container15 />
      <Heading3 />
      <Paragraph1 />
      <Container16 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p3344e600} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p264d4500} id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p3fae7f80} id="Vector_3" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p1b777d00} id="Vector_4" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-[rgba(26,101,199,0.1)] content-stretch flex items-center justify-center left-[22.5px] px-[9.375px] rounded-[9.375px] size-[37.5px] top-[22.5px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[26.25px] left-[22.5px] top-[75px] w-[265.5px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-0 not-italic text-[#0c0c0d] text-[18.75px] top-0 tracking-[-0.375px] whitespace-nowrap">Управление клиентами</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[56.25px] left-[22.5px] top-[108.75px] w-[265.5px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] w-[266px]">Подключайте своих клиентов и управляйте их автопарками в едином интерфейсе.</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute bg-white border border-[rgba(225,229,234,0.5)] border-solid h-[189.5px] left-0 rounded-[13.375px] top-0 w-[312.5px]" data-name="Container">
      <Container19 />
      <Heading4 />
      <Paragraph2 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p35ab0600} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p37480e00} id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[rgba(26,101,199,0.1)] content-stretch flex items-center justify-center left-[22.5px] px-[9.375px] rounded-[9.375px] size-[37.5px] top-[22.5px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[26.25px] left-[22.5px] top-[75px] w-[265.5px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-0 not-italic text-[#0c0c0d] text-[18.75px] top-0 tracking-[-0.375px] whitespace-nowrap">Дополнительный доход</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[56.25px] left-[22.5px] top-[108.75px] w-[265.5px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] w-[266px]">Получайте комиссию с каждого клиента, подключённого через вашу партнёрскую программу.</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-white border border-[rgba(225,229,234,0.5)] border-solid h-[189.5px] left-[335px] rounded-[13.375px] top-0 w-[312.5px]" data-name="Container">
      <Container21 />
      <Heading5 />
      <Paragraph3 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.paf55780} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-[rgba(26,101,199,0.1)] content-stretch flex items-center justify-center left-[22.5px] px-[9.375px] rounded-[9.375px] size-[37.5px] top-[22.5px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute h-[26.25px] left-[22.5px] top-[75px] w-[265.5px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-0 not-italic text-[#0c0c0d] text-[18.75px] top-0 tracking-[-0.375px] whitespace-nowrap">Техническая поддержка</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[37.5px] left-[22.5px] top-[108.75px] w-[265.5px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] w-[266px]">Выделенный менеджер и приоритетная поддержка для партнёров и их клиентов.</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute bg-white border border-[rgba(225,229,234,0.5)] border-solid h-[170.75px] left-0 rounded-[13.375px] top-[212px] w-[312.5px]" data-name="Container">
      <Container23 />
      <Heading6 />
      <Paragraph4 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p230b8a00} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p1e6363c0} id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-[rgba(26,101,199,0.1)] content-stretch flex items-center justify-center left-[22.5px] px-[9.375px] rounded-[9.375px] size-[37.5px] top-[22.5px]" data-name="Container">
      <Icon7 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute h-[26.25px] left-[22.5px] top-[75px] w-[265.5px]" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-0 not-italic text-[#0c0c0d] text-[18.75px] top-0 tracking-[-0.375px] whitespace-nowrap">Гибкие настройки</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[37.5px] left-[22.5px] top-[108.75px] w-[265.5px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] w-[266px]">Настраивайте уведомления и доступы индивидуально для каждого клиента.</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-white border border-[rgba(225,229,234,0.5)] border-solid h-[170.75px] left-[335px] rounded-[13.375px] top-[212px] w-[312.5px]" data-name="Container">
      <Container25 />
      <Heading7 />
      <Paragraph5 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[382.75px] left-[692.5px] top-0 w-[647.5px]" data-name="Container">
      <Container18 />
      <Container20 />
      <Container22 />
      <Container24 />
    </div>
  );
}

function PartnersSection() {
  return (
    <div className="absolute h-[382.75px] left-[64px] top-[2406.25px] w-[1340px]" data-name="PartnersSection">
      <Container14 />
      <Container17 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[37.5px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[37.5px] left-[315.34px] not-italic text-[#0c0c0d] text-[33.75px] text-center top-px tracking-[-0.8438px] whitespace-nowrap">Прозрачные тарифы</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[52.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[26.25px] left-[315px] not-italic text-[#5b6471] text-[16.875px] text-center top-0 w-[630px]">Выберите план, который подходит вашему бизнесу. Все тарифы включают 14-дневный бесплатный пробный период.</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] h-[105px] items-start left-[385px] top-0 w-[630px]" data-name="Container">
      <Heading8 />
      <Paragraph6 />
    </div>
  );
}

function CardTitle3() {
  return (
    <div className="h-[26.25px] relative shrink-0 w-[258px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-[129.52px] not-italic text-[#0c0c0d] text-[18.75px] text-center top-0 tracking-[-0.4688px] whitespace-nowrap">Стартовый</p>
      </div>
    </div>
  );
}

function CardDescription3() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-[258px]" data-name="CardDescription">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-[129.13px] not-italic text-[#5b6471] text-[13.125px] text-center top-[0.5px] whitespace-nowrap">Для небольших компаний</p>
      </div>
    </div>
  );
}

function CardHeader3() {
  return (
    <div className="h-[88.125px] relative shrink-0 w-[303px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5.625px] items-start pb-[15px] pt-[22.5px] px-[22.5px] relative size-full">
        <CardTitle3 />
        <CardDescription3 />
      </div>
    </div>
  );
}

function PricingSection1() {
  return (
    <div className="h-[37.5px] relative shrink-0 w-full" data-name="PricingSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[0] left-[129.07px] not-italic text-[#0c0c0d] text-[0px] text-center top-px whitespace-nowrap">
        <span className="leading-[37.5px] text-[33.75px]">₽100</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] text-[#5b6471] text-[15px]">за ТС/месяц</span>
      </p>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p29378a00} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-[184.867px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">До 10 транспортных средств</p>
      </div>
    </div>
  );
}

function ListItem9() {
  return (
    <div className="content-stretch flex gap-[7.5px] h-[20.625px] items-start relative shrink-0 w-full" data-name="List Item">
      <Icon8 />
      <Text1 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p29378a00} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-[149.461px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Мониторинг пропусков</p>
      </div>
    </div>
  );
}

function ListItem10() {
  return (
    <div className="content-stretch flex gap-[7.5px] h-[20.625px] items-start relative shrink-0 w-full" data-name="List Item">
      <Icon9 />
      <Text2 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p29378a00} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-[123.516px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Email-уведомления</p>
      </div>
    </div>
  );
}

function ListItem11() {
  return (
    <div className="content-stretch flex gap-[7.5px] h-[20.625px] items-start relative shrink-0 w-full" data-name="List Item">
      <Icon10 />
      <Text3 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p29378a00} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-[126.102px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">История за 30 дней</p>
      </div>
    </div>
  );
}

function ListItem12() {
  return (
    <div className="content-stretch flex gap-[7.5px] h-[20.625px] items-start relative shrink-0 w-full" data-name="List Item">
      <Icon11 />
      <Text4 />
    </div>
  );
}

function PricingSection2() {
  return (
    <div className="content-stretch flex flex-col gap-[11.25px] h-[116.25px] items-start relative shrink-0 w-full" data-name="PricingSection">
      <ListItem9 />
      <ListItem10 />
      <ListItem11 />
      <ListItem12 />
    </div>
  );
}

function CardContent() {
  return (
    <div className="flex-[262.5_0_0] min-h-px min-w-px relative w-[303px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[22.5px] items-start px-[22.5px] relative size-full">
        <PricingSection1 />
        <PricingSection2 />
      </div>
    </div>
  );
}

function SlotSlotClone2() {
  return (
    <div className="flex-[1_0_0] h-[37.5px] min-h-px min-w-px relative rounded-[13.375px]" data-name="Slot.SlotClone">
      <div aria-hidden="true" className="absolute border border-[#e1e5ea] border-solid inset-0 pointer-events-none rounded-[13.375px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[19.75px] py-[8.5px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18.75px] not-italic relative shrink-0 text-[#0c0c0d] text-[13.125px] whitespace-nowrap">Попробовать бесплатно</p>
        </div>
      </div>
    </div>
  );
}

function CardFooter() {
  return (
    <div className="h-[60px] relative shrink-0 w-[303px]" data-name="CardFooter">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[22.5px] px-[22.5px] relative size-full">
        <SlotSlotClone2 />
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[412.625px] items-start left-0 p-px rounded-[15px] top-0 w-[305px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.5)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" />
      <CardHeader3 />
      <CardContent />
      <CardFooter />
    </div>
  );
}

function CardTitle4() {
  return (
    <div className="h-[28.6px] relative shrink-0 w-[283.8px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28.875px] left-[141.68px] not-italic text-[#0c0c0d] text-[20.625px] text-center top-[-0.14px] tracking-[-0.5156px] whitespace-nowrap">Бизнес</p>
      </div>
    </div>
  );
}

function CardDescription4() {
  return (
    <div className="h-[20.9px] relative shrink-0 w-[283.8px]" data-name="CardDescription">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20.625px] left-[142.43px] not-italic text-[#5b6471] text-[14.438px] text-center top-[0.41px] whitespace-nowrap">Для растущих компаний</p>
      </div>
    </div>
  );
}

function CardHeader4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[6.188px] h-[96.8px] items-start left-0 pb-[16.5px] pt-[24.819px] px-[24.75px] top-[0.27px] w-[333.3px]" data-name="CardHeader">
      <CardTitle4 />
      <CardDescription4 />
    </div>
  );
}

function PricingSection3() {
  return (
    <div className="h-[41.8px] relative shrink-0 w-full" data-name="PricingSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[0] left-[142.21px] not-italic text-[#0c0c0d] text-[0px] text-center top-[1.1px] whitespace-nowrap">
        <span className="leading-[41.25px] text-[37.125px]">₽220</span>
        <span className="font-['Inter:Regular',sans-serif] font-normal leading-[24.75px] text-[#5b6471] text-[16.5px]">за ТС/месяц</span>
      </p>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-0 size-[20.625px] top-[2.27px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.625 20.625">
        <g id="Icon">
          <path d={svgPaths.p3198bf90} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.71875" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[20.9px] left-[28.81px] top-[0.07px] w-[205.7px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20.625px] left-[0.06px] not-italic text-[#5b6471] text-[14.438px] top-[0.41px] whitespace-nowrap">До 50 транспортных средств</p>
    </div>
  );
}

function ListItem13() {
  return (
    <div className="h-[23.1px] relative shrink-0 w-full" data-name="List Item">
      <Icon12 />
      <Text5 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-0 size-[20.625px] top-[2.27px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.625 20.625">
        <g id="Icon">
          <path d={svgPaths.p3198bf90} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.71875" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[20.9px] left-[28.78px] top-[0.07px] w-[226.6px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20.625px] left-[0.09px] not-italic text-[#5b6471] text-[14.438px] top-[0.41px] whitespace-nowrap">Пропуска + РНИС + Телеметрия</p>
    </div>
  );
}

function ListItem14() {
  return (
    <div className="h-[23.1px] relative shrink-0 w-full" data-name="List Item">
      <Icon13 />
      <Text6 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-0 size-[20.625px] top-[2.27px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.625 20.625">
        <g id="Icon">
          <path d={svgPaths.p3198bf90} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.71875" />
        </g>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[20.9px] left-[29.11px] top-[0.07px] w-[211.2px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20.625px] left-[-0.23px] not-italic text-[#5b6471] text-[14.438px] top-[0.41px] whitespace-nowrap">Email и Telegram уведомления</p>
    </div>
  );
}

function ListItem15() {
  return (
    <div className="h-[23.1px] relative shrink-0 w-full" data-name="List Item">
      <Icon14 />
      <Text7 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-0 size-[20.625px] top-[2.27px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.625 20.625">
        <g id="Icon">
          <path d={svgPaths.p3198bf90} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.71875" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute h-[20.9px] left-[29px] top-[0.07px] w-[138.6px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20.625px] left-[-0.13px] not-italic text-[#5b6471] text-[14.438px] top-[0.41px] whitespace-nowrap">История за 90 дней</p>
    </div>
  );
}

function ListItem16() {
  return (
    <div className="h-[23.1px] relative shrink-0 w-full" data-name="List Item">
      <Icon15 />
      <Text8 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-0 size-[20.625px] top-[2.27px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.625 20.625">
        <g id="Icon">
          <path d={svgPaths.p3198bf90} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.71875" />
        </g>
      </svg>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute h-[20.9px] left-[28.88px] top-[0.07px] w-[182.6px]" data-name="Text">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20.625px] left-[-0.01px] not-italic text-[#5b6471] text-[14.438px] top-[0.41px] whitespace-nowrap">Приоритетная поддержка</p>
    </div>
  );
}

function ListItem17() {
  return (
    <div className="h-[23.1px] relative shrink-0 w-full" data-name="List Item">
      <Icon16 />
      <Text9 />
    </div>
  );
}

function PricingSection4() {
  return (
    <div className="content-stretch flex flex-col gap-[11.963px] h-[162.8px] items-start pt-[-0.275px] relative shrink-0 w-full" data-name="PricingSection">
      <ListItem13 />
      <ListItem14 />
      <ListItem15 />
      <ListItem16 />
      <ListItem17 />
    </div>
  );
}

function CardContent1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24.544px] h-[289.3px] items-start left-0 px-[24.75px] top-[96.87px] w-[333.3px]" data-name="CardContent">
      <PricingSection3 />
      <PricingSection4 />
    </div>
  );
}

function SlotSlotClone3() {
  return (
    <div className="bg-[#1a65c7] flex-[1_0_0] h-[41.8px] min-h-px min-w-px relative rounded-[14.713px]" data-name="Slot.SlotClone">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[20.625px] py-[8.25px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20.625px] not-italic relative shrink-0 text-[14.438px] text-white whitespace-nowrap">Попробовать бесплатно</p>
        </div>
      </div>
    </div>
  );
}

function CardFooter1() {
  return (
    <div className="absolute content-stretch flex h-[66px] items-center left-0 pb-[24.75px] px-[24.75px] top-[385.89px] w-[333.3px]" data-name="CardFooter">
      <SlotSlotClone3 />
    </div>
  );
}

function Text10() {
  return (
    <div className="bg-[#1a65c7] h-[23.1px] relative rounded-[10998.9px] shrink-0 w-full" data-name="Text">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-[12.45px] not-italic text-[12.375px] text-white top-[3.3px] whitespace-nowrap">Популярный</p>
    </div>
  );
}

function PricingSection5() {
  return (
    <div className="absolute content-stretch flex flex-col h-[25.3px] items-start left-[114.95px] pt-[2.75px] top-[-12.44px] w-[103.4px]" data-name="PricingSection">
      <Text10 />
    </div>
  );
}

function Card4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] border-[#1a65c7] border-[1.1px] border-solid h-[454.3px] left-[312.25px] rounded-[16.5px] shadow-[0px_4.4px_6.6px_0px_rgba(0,0,0,0.08),0px_2.2px_4.4px_0px_rgba(0,0,0,0.04)] top-[-20.84px] w-[335.5px]" data-name="Card">
      <CardHeader4 />
      <CardContent1 />
      <CardFooter1 />
      <PricingSection5 />
    </div>
  );
}

function CardTitle5() {
  return (
    <div className="h-[26.25px] relative shrink-0 w-[258px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-[128.58px] not-italic text-[#0c0c0d] text-[18.75px] text-center top-0 tracking-[-0.4688px] whitespace-nowrap">Корпоративный</p>
      </div>
    </div>
  );
}

function CardDescription5() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-[258px]" data-name="CardDescription">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-[128.57px] not-italic text-[#5b6471] text-[13.125px] text-center top-[0.5px] whitespace-nowrap">Для крупного бизнеса</p>
      </div>
    </div>
  );
}

function CardHeader5() {
  return (
    <div className="h-[88.125px] relative shrink-0 w-[303px]" data-name="CardHeader">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[5.625px] items-start pb-[15px] pt-[22.5px] px-[22.5px] relative size-full">
        <CardTitle5 />
        <CardDescription5 />
      </div>
    </div>
  );
}

function PricingSection6() {
  return (
    <div className="h-[37.5px] relative shrink-0 w-full" data-name="PricingSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[37.5px] left-[128.53px] not-italic text-[#0c0c0d] text-[33.75px] text-center top-px whitespace-nowrap">Договорная</p>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p29378a00} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-[175.336px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Неограниченное кол-во ТС</p>
      </div>
    </div>
  );
}

function ListItem18() {
  return (
    <div className="content-stretch flex gap-[7.5px] h-[20.625px] items-start relative shrink-0 w-full" data-name="List Item">
      <Icon17 />
      <Text11 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p29378a00} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-[190.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Все возможности платформы</p>
      </div>
    </div>
  );
}

function ListItem19() {
  return (
    <div className="content-stretch flex gap-[7.5px] h-[20.625px] items-start relative shrink-0 w-full" data-name="List Item">
      <Icon18 />
      <Text12 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p29378a00} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-[100.125px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">API-интеграция</p>
      </div>
    </div>
  );
}

function ListItem20() {
  return (
    <div className="content-stretch flex gap-[7.5px] h-[20.625px] items-start relative shrink-0 w-full" data-name="List Item">
      <Icon19 />
      <Text13 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p29378a00} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-[151.141px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Выделенный менеджер</p>
      </div>
    </div>
  );
}

function ListItem21() {
  return (
    <div className="content-stretch flex gap-[7.5px] h-[20.625px] items-start relative shrink-0 w-full" data-name="List Item">
      <Icon20 />
      <Text14 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p29378a00} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-[67.68px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">SLA 99.9%</p>
      </div>
    </div>
  );
}

function ListItem22() {
  return (
    <div className="content-stretch flex gap-[7.5px] h-[20.625px] items-start relative shrink-0 w-full" data-name="List Item">
      <Icon21 />
      <Text15 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p29378a00} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-[91.289px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Кастомизация</p>
      </div>
    </div>
  );
}

function ListItem23() {
  return (
    <div className="content-stretch flex gap-[7.5px] h-[20.625px] items-start relative shrink-0 w-full" data-name="List Item">
      <Icon22 />
      <Text16 />
    </div>
  );
}

function PricingSection7() {
  return (
    <div className="content-stretch flex flex-col gap-[11.25px] h-[180px] items-start relative shrink-0 w-full" data-name="PricingSection">
      <ListItem18 />
      <ListItem19 />
      <ListItem20 />
      <ListItem21 />
      <ListItem22 />
      <ListItem23 />
    </div>
  );
}

function CardContent2() {
  return (
    <div className="flex-[262.5_0_0] min-h-px min-w-px relative w-[303px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[22.5px] items-start px-[22.5px] relative size-full">
        <PricingSection6 />
        <PricingSection7 />
      </div>
    </div>
  );
}

function SlotSlotClone4() {
  return (
    <div className="flex-[1_0_0] h-[37.5px] min-h-px min-w-px relative rounded-[13.375px]" data-name="Slot.SlotClone">
      <div aria-hidden="true" className="absolute border border-[#e1e5ea] border-solid inset-0 pointer-events-none rounded-[13.375px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[19.75px] py-[8.5px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[18.75px] not-italic relative shrink-0 text-[#0c0c0d] text-[13.125px] whitespace-nowrap">Связаться</p>
        </div>
      </div>
    </div>
  );
}

function CardFooter2() {
  return (
    <div className="h-[60px] relative shrink-0 w-[303px]" data-name="CardFooter">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[22.5px] px-[22.5px] relative size-full">
        <SlotSlotClone4 />
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[412.625px] items-start left-[655px] p-px rounded-[15px] top-0 w-[305px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.5)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" />
      <CardHeader5 />
      <CardContent2 />
      <CardFooter2 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[412.625px] left-[220px] top-[165px] w-[960px]" data-name="Container">
      <Card3 />
      <Card4 />
      <Card5 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[577.625px] relative shrink-0 w-full" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function PricingSection() {
  return (
    <div className="absolute bg-[rgba(234,236,241,0.3)] content-stretch flex flex-col h-[787.625px] items-start left-0 pt-[105px] px-[34px] top-[2894px] w-[1468px]" data-name="PricingSection">
      <Container26 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute content-stretch flex h-[33.75px] items-start left-[30px] top-0 w-[900px]" data-name="Heading 2">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[33.75px] min-h-px min-w-px not-italic relative text-[#0c0c0d] text-[28.125px] text-center tracking-[-0.5625px]">Онлайн проверки транспорта</p>
    </div>
  );
}

function Icon23() {
  return (
    <div className="absolute left-[90.88px] size-[30px] top-[22.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Icon">
          <path d={svgPaths.p8b32900} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function CheckLinksSection1() {
  return (
    <div className="absolute h-[37.5px] left-[22.5px] top-[63.75px] w-[166.75px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18.75px] left-[83.5px] not-italic text-[#0c0c0d] text-[13.125px] text-center top-[0.5px] w-[167px]">Проверить пропуск МКАД</p>
    </div>
  );
}

function CheckLinksSection2() {
  return (
    <div className="absolute h-[60px] left-[22.5px] top-[106.88px] w-[166.75px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[83.5px] not-italic text-[#5b6471] text-[11.25px] text-center top-[-0.5px] w-[167px]">Проверка действующего пропуска на МКАД по госномеру транспортного средства</p>
    </div>
  );
}

function CardContent3() {
  return (
    <div className="h-[189.375px] relative shrink-0 w-full" data-name="CardContent">
      <Icon23 />
      <CheckLinksSection1 />
      <CheckLinksSection2 />
    </div>
  );
}

function Card6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[191.375px] items-start left-0 p-px rounded-[15px] top-0 w-[213.75px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.5)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" />
      <CardContent3 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="absolute left-[90.88px] size-[30px] top-[22.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Icon">
          <path d={svgPaths.p8b32900} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function CheckLinksSection3() {
  return (
    <div className="absolute h-[18.75px] left-[22.5px] top-[63.75px] w-[166.75px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18.75px] left-[84.11px] not-italic text-[#0c0c0d] text-[13.125px] text-center top-[0.5px] whitespace-nowrap">Проверить пропуск ТТК</p>
    </div>
  );
}

function CheckLinksSection4() {
  return (
    <div className="absolute h-[45px] left-[22.5px] top-[88.13px] w-[166.75px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[83.5px] not-italic text-[#5b6471] text-[11.25px] text-center top-[-0.5px] w-[167px]">Проверка наличия пропуска на Третье транспортное кольцо Москвы</p>
    </div>
  );
}

function CardContent4() {
  return (
    <div className="h-[155.625px] relative shrink-0 w-full" data-name="CardContent">
      <Icon24 />
      <CheckLinksSection3 />
      <CheckLinksSection4 />
    </div>
  );
}

function Card7() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[191.375px] items-start left-[228.75px] p-px rounded-[15px] top-0 w-[213.75px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.5)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" />
      <CardContent4 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="absolute left-[90.88px] size-[30px] top-[22.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Icon">
          <path d={svgPaths.p570e080} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M26.25 26.25L20.875 20.875" id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function CheckLinksSection5() {
  return (
    <div className="absolute h-[37.5px] left-[22.5px] top-[63.75px] w-[166.75px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18.75px] left-[83.5px] not-italic text-[#0c0c0d] text-[13.125px] text-center top-[0.5px] w-[167px]">Проверить пропуск по номеру</p>
    </div>
  );
}

function CheckLinksSection6() {
  return (
    <div className="absolute h-[30px] left-[22.5px] top-[106.88px] w-[166.75px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[83.5px] not-italic text-[#5b6471] text-[11.25px] text-center top-[-0.5px] w-[167px]">Поиск и проверка статуса пропуска по его номеру</p>
    </div>
  );
}

function CardContent5() {
  return (
    <div className="h-[159.375px] relative shrink-0 w-full" data-name="CardContent">
      <Icon25 />
      <CheckLinksSection5 />
      <CheckLinksSection6 />
    </div>
  );
}

function Card8() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[191.375px] items-start left-[457.5px] p-px rounded-[15px] top-0 w-[213.75px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.5)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" />
      <CardContent5 />
    </div>
  );
}

function Icon26() {
  return (
    <div className="absolute left-[90.88px] size-[30px] top-[22.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Icon">
          <path d={svgPaths.p2501c3a0} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p23a7500} id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p10b85580} id="Vector_3" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M20 10L23.75 6.25" id="Vector_4" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.pbbab300} id="Vector_5" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function CheckLinksSection7() {
  return (
    <div className="absolute h-[18.75px] left-[22.5px] top-[63.75px] w-[166.75px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18.75px] left-[83.19px] not-italic text-[#0c0c0d] text-[13.125px] text-center top-[0.5px] whitespace-nowrap">Проверить РНИС</p>
    </div>
  );
}

function CheckLinksSection8() {
  return (
    <div className="absolute h-[45px] left-[22.5px] top-[88.13px] w-[166.75px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[83.5px] not-italic text-[#5b6471] text-[11.25px] text-center top-[-0.5px] w-[167px]">Проверка подключения транспорта к региональной навигационной системе</p>
    </div>
  );
}

function CardContent6() {
  return (
    <div className="h-[155.625px] relative shrink-0 w-full" data-name="CardContent">
      <Icon26 />
      <CheckLinksSection7 />
      <CheckLinksSection8 />
    </div>
  );
}

function Card9() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[191.375px] items-start left-[686.25px] p-px rounded-[15px] top-0 w-[213.75px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.5)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" />
      <CardContent6 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="absolute left-[90.88px] size-[30px] top-[22.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Icon">
          <path d={svgPaths.p2501c3a0} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p23a7500} id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p10b85580} id="Vector_3" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M20 10L23.75 6.25" id="Vector_4" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.pbbab300} id="Vector_5" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function CheckLinksSection9() {
  return (
    <div className="absolute h-[37.5px] left-[22.5px] top-[63.75px] w-[166.75px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18.75px] left-[83.5px] not-italic text-[#0c0c0d] text-[13.125px] text-center top-[0.5px] w-[167px]">Проверить РНИС по номеру</p>
    </div>
  );
}

function CheckLinksSection10() {
  return (
    <div className="absolute h-[30px] left-[22.5px] top-[106.88px] w-[166.75px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[83.5px] not-italic text-[#5b6471] text-[11.25px] text-center top-[-0.5px] w-[167px]">Проверка статуса РНИС по госномеру автомобиля</p>
    </div>
  );
}

function CardContent7() {
  return (
    <div className="h-[159.375px] relative shrink-0 w-full" data-name="CardContent">
      <Icon27 />
      <CheckLinksSection9 />
      <CheckLinksSection10 />
    </div>
  );
}

function Card10() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[161.375px] items-start left-0 p-px rounded-[15px] top-[206.38px] w-[213.75px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.5)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" />
      <CardContent7 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="absolute left-[90.88px] size-[30px] top-[22.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Icon">
          <path d={svgPaths.p37bd5800} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p29db7f00} id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.ped21a80} id="Vector_3" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p3be38b00} id="Vector_4" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p2e6e23a0} id="Vector_5" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function CheckLinksSection11() {
  return (
    <div className="absolute h-[18.75px] left-[22.5px] top-[63.75px] w-[166.75px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18.75px] left-[83.75px] not-italic text-[#0c0c0d] text-[13.125px] text-center top-[0.5px] whitespace-nowrap">Проверить телематику</p>
    </div>
  );
}

function CheckLinksSection12() {
  return (
    <div className="absolute h-[45px] left-[22.5px] top-[88.13px] w-[166.75px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[83.5px] not-italic text-[#5b6471] text-[11.25px] text-center top-[-0.5px] w-[167px]">Проверка работы телематического оборудования на транспорте</p>
    </div>
  );
}

function CardContent8() {
  return (
    <div className="h-[155.625px] relative shrink-0 w-full" data-name="CardContent">
      <Icon28 />
      <CheckLinksSection11 />
      <CheckLinksSection12 />
    </div>
  );
}

function Card11() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[161.375px] items-start left-[228.75px] p-px rounded-[15px] top-[206.38px] w-[213.75px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.5)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" />
      <CardContent8 />
    </div>
  );
}

function Icon29() {
  return (
    <div className="absolute left-[90.88px] size-[30px] top-[22.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Icon">
          <path d={svgPaths.p37bd5800} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p29db7f00} id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.ped21a80} id="Vector_3" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p3be38b00} id="Vector_4" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p2e6e23a0} id="Vector_5" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function CheckLinksSection13() {
  return (
    <div className="absolute h-[18.75px] left-[22.5px] top-[63.75px] w-[166.75px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18.75px] left-[83.15px] not-italic text-[#0c0c0d] text-[13.125px] text-center top-[0.5px] whitespace-nowrap">Проверить ГЛОНАСС</p>
    </div>
  );
}

function CheckLinksSection14() {
  return (
    <div className="absolute h-[45px] left-[22.5px] top-[88.13px] w-[166.75px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[83.5px] not-italic text-[#5b6471] text-[11.25px] text-center top-[-0.5px] w-[167px]">Проверка подключения и работы ГЛОНАСС-трекера на ТС</p>
    </div>
  );
}

function CardContent9() {
  return (
    <div className="h-[155.625px] relative shrink-0 w-full" data-name="CardContent">
      <Icon29 />
      <CheckLinksSection13 />
      <CheckLinksSection14 />
    </div>
  );
}

function Card12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[161.375px] items-start left-[457.5px] p-px rounded-[15px] top-[206.38px] w-[213.75px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.5)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" />
      <CardContent9 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[367.75px] left-[30px] top-[63.75px] w-[900px]" data-name="Container">
      <Card6 />
      <Card7 />
      <Card8 />
      <Card9 />
      <Card10 />
      <Card11 />
      <Card12 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="absolute h-[26.25px] left-[30px] top-[469px] w-[900px]" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-[450.55px] not-italic text-[#0c0c0d] text-[18.75px] text-center top-0 tracking-[-0.375px] whitespace-nowrap">Полезные материалы</p>
    </div>
  );
}

function Icon30() {
  return (
    <div className="absolute left-[137.75px] size-[30px] top-[22.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Icon">
          <path d={svgPaths.p237b8f00} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d={svgPaths.p394bd680} id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M12.5 11.25H10" id="Vector_3" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M20 16.25H10" id="Vector_4" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M20 21.25H10" id="Vector_5" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function CheckLinksSection15() {
  return (
    <div className="absolute h-[18.75px] left-[22.5px] top-[63.75px] w-[260.5px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18.75px] left-[130.43px] not-italic text-[#0c0c0d] text-[13.125px] text-center top-[0.5px] whitespace-nowrap">Передача данных в РНИС</p>
    </div>
  );
}

function CheckLinksSection16() {
  return (
    <div className="absolute h-[30px] left-[22.5px] top-[88.13px] w-[260.5px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[130.5px] not-italic text-[#5b6471] text-[11.25px] text-center top-[-0.5px] w-[261px]">Как настроить передачу телематических данных в РНИС и требования к оборудованию</p>
    </div>
  );
}

function CardContent10() {
  return (
    <div className="h-[140.625px] relative shrink-0 w-full" data-name="CardContent">
      <Icon30 />
      <CheckLinksSection15 />
      <CheckLinksSection16 />
    </div>
  );
}

function Card13() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[157.625px] items-start left-0 p-px rounded-[15px] top-0 w-[307.5px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.5)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" />
      <CardContent10 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="absolute left-[137.75px] size-[30px] top-[22.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="Icon">
          <path d={svgPaths.pfb68500} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M15 11.25V16.25" id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
          <path d="M15 21.25H15.0125" id="Vector_3" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

function CheckLinksSection17() {
  return (
    <div className="absolute h-[18.75px] left-[22.5px] top-[63.75px] w-[260.5px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18.75px] left-[130.38px] not-italic text-[#0c0c0d] text-[13.125px] text-center top-[0.5px] whitespace-nowrap">Транспорт не передаёт данные в РНИС</p>
    </div>
  );
}

function CheckLinksSection18() {
  return (
    <div className="absolute h-[45px] left-[22.5px] top-[88.13px] w-[260.5px]" data-name="CheckLinksSection">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[130.5px] not-italic text-[#5b6471] text-[11.25px] text-center top-[-0.5px] w-[261px]">Причины отсутствия данных в РНИС и пошаговая инструкция по устранению проблем</p>
    </div>
  );
}

function CardContent11() {
  return (
    <div className="h-[155.625px] relative shrink-0 w-full" data-name="CardContent">
      <Icon31 />
      <CheckLinksSection17 />
      <CheckLinksSection18 />
    </div>
  );
}

function Card14() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[157.625px] items-start left-[322.5px] p-px rounded-[15px] top-0 w-[307.5px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.5)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" />
      <CardContent11 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute h-[157.625px] left-[165px] top-[510.25px] w-[630px]" data-name="Container">
      <Card13 />
      <Card14 />
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[667.875px] relative shrink-0 w-full" data-name="Container">
      <Heading9 />
      <Container30 />
      <Heading10 />
      <Container31 />
    </div>
  );
}

function CheckLinksSection() {
  return (
    <div className="absolute bg-[rgba(234,236,241,0.3)] content-stretch flex flex-col h-[817.875px] items-start left-0 pt-[75px] px-[254px] top-[3681.63px] w-[1468px]" data-name="CheckLinksSection">
      <Container29 />
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[37.5px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[37.5px] left-[315.88px] not-italic text-[#0c0c0d] text-[33.75px] text-center top-px tracking-[-0.8438px] whitespace-nowrap">Свяжитесь с нами</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[52.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[26.25px] left-[315px] not-italic text-[#5b6471] text-[16.875px] text-center top-0 w-[630px]">Остались вопросы? Напишите нам, и мы поможем подобрать оптимальное решение для вашего бизнеса.</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] h-[105px] items-start left-[385px] top-0 w-[630px]" data-name="Container">
      <Heading11 />
      <Paragraph7 />
    </div>
  );
}

function CardTitle6() {
  return (
    <div className="h-[26.25px] relative shrink-0 w-[358px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-0 not-italic text-[#0c0c0d] text-[16.875px] top-0 tracking-[-0.4219px] whitespace-nowrap">Контактная информация</p>
      </div>
    </div>
  );
}

function CardDescription6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[358px]" data-name="CardDescription">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] w-[358px]">Мы работаем в будни с 9:00 до 18:00 по московскому времени</p>
      </div>
    </div>
  );
}

function CardHeader6() {
  return (
    <div className="h-[114.375px] relative shrink-0 w-full" data-name="CardHeader">
      <div className="content-stretch flex flex-col gap-[5.625px] items-start p-[22.5px] relative size-full">
        <CardTitle6 />
        <CardDescription6 />
      </div>
    </div>
  );
}

function Icon32() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p3ff30240} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[rgba(26,101,199,0.1)] relative rounded-[9.375px] shrink-0 size-[37.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[9.375px] relative size-full">
        <Icon32 />
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Телефон</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] left-0 not-italic text-[#0c0c0d] text-[15px] top-[-0.5px] whitespace-nowrap">+7 (495) 487-50-07</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[41.25px] relative shrink-0 w-[142.883px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph8 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function ContactSection1() {
  return (
    <div className="content-stretch flex gap-[11.25px] h-[41.25px] items-center relative shrink-0 w-full" data-name="ContactSection">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Icon33() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p346da000} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p3c322000} id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-[rgba(26,101,199,0.1)] relative rounded-[9.375px] shrink-0 size-[37.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[9.375px] relative size-full">
        <Icon33 />
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Email</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] left-0 not-italic text-[#0c0c0d] text-[15px] top-[-0.5px] whitespace-nowrap">info@rniscontrol.ru</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[41.25px] relative shrink-0 w-[134.313px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph10 />
        <Paragraph11 />
      </div>
    </div>
  );
}

function ContactSection2() {
  return (
    <div className="content-stretch flex gap-[11.25px] h-[41.25px] items-center relative shrink-0 w-full" data-name="ContactSection">
      <Container36 />
      <Container37 />
    </div>
  );
}

function Icon34() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p3aaa8800} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p9336f00} id="Vector_2" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-[rgba(26,101,199,0.1)] relative rounded-[9.375px] shrink-0 size-[37.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[9.375px] relative size-full">
        <Icon34 />
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">Адрес</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] left-0 not-italic text-[#0c0c0d] text-[15px] top-[-0.5px] whitespace-nowrap">Москва, Россия</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[41.25px] relative shrink-0 w-[116.094px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph12 />
        <Paragraph13 />
      </div>
    </div>
  );
}

function ContactSection3() {
  return (
    <div className="content-stretch flex gap-[11.25px] h-[41.25px] items-center relative shrink-0 w-full" data-name="ContactSection">
      <Container38 />
      <Container39 />
    </div>
  );
}

function CardContent12() {
  return (
    <div className="h-[176.25px] relative shrink-0 w-full" data-name="CardContent">
      <div className="content-stretch flex flex-col gap-[15px] items-start px-[22.5px] relative size-full">
        <ContactSection1 />
        <ContactSection2 />
        <ContactSection3 />
      </div>
    </div>
  );
}

function Card15() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] content-stretch flex flex-col h-[292.625px] items-start left-0 p-px rounded-[15px] top-0 w-[405px]" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.5)] border-solid inset-0 pointer-events-none rounded-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)]" />
      <CardHeader6 />
      <CardContent12 />
    </div>
  );
}

function CardTitle7() {
  return (
    <div className="h-[26.25px] relative shrink-0 w-[358px]" data-name="CardTitle">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-0 not-italic text-[#0c0c0d] text-[16.875px] top-0 tracking-[-0.4219px] whitespace-nowrap">Отправить сообщение</p>
      </div>
    </div>
  );
}

function CardDescription7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[358px]" data-name="CardDescription">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] w-[358px]">Заполните форму, и мы ответим в течение одного рабочего дня</p>
      </div>
    </div>
  );
}

function CardHeader7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5.625px] h-[114.375px] items-start left-0 p-[22.5px] top-0 w-[403px]" data-name="CardHeader">
      <CardTitle7 />
      <CardDescription7 />
    </div>
  );
}

function Label() {
  return (
    <div className="absolute content-stretch flex h-[15.5px] items-start left-0 top-[4.5px] w-[36.836px]" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.125px] not-italic relative shrink-0 text-[#0c0c0d] text-[13.125px] whitespace-nowrap">Имя *</p>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.5)] h-[37.5px] left-0 rounded-[13.375px] top-[30px] w-[358px]" data-name="Input">
      <div className="content-stretch flex items-center overflow-clip px-[15px] py-[7.5px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6471] text-[13.125px] whitespace-nowrap">Ваше имя</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e5ea] border-solid inset-0 pointer-events-none rounded-[13.375px]" />
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[67.5px] relative shrink-0 w-full" data-name="Container">
      <Label />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div className="absolute content-stretch flex h-[15.5px] items-start left-0 top-[4.5px] w-[43.203px]" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.125px] not-italic relative shrink-0 text-[#0c0c0d] text-[13.125px] whitespace-nowrap">Email *</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.5)] h-[37.5px] left-0 rounded-[13.375px] top-[30px] w-[358px]" data-name="Input">
      <div className="content-stretch flex items-center overflow-clip px-[15px] py-[7.5px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6471] text-[13.125px] whitespace-nowrap">email@example.com</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e5ea] border-solid inset-0 pointer-events-none rounded-[13.375px]" />
    </div>
  );
}

function Container41() {
  return (
    <div className="h-[67.5px] relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Input1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="absolute content-stretch flex h-[15.5px] items-start left-0 top-[4.5px] w-[66.016px]" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.125px] not-italic relative shrink-0 text-[#0c0c0d] text-[13.125px] whitespace-nowrap">Телефон *</p>
    </div>
  );
}

function Input2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.5)] h-[37.5px] left-0 rounded-[13.375px] top-[30px] w-[358px]" data-name="Input">
      <div className="content-stretch flex items-center overflow-clip px-[15px] py-[7.5px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6471] text-[13.125px] whitespace-nowrap">+7 (___) ___-__-__</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e5ea] border-solid inset-0 pointer-events-none rounded-[13.375px]" />
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[67.5px] relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Input2 />
    </div>
  );
}

function Label3() {
  return (
    <div className="absolute content-stretch flex h-[15.5px] items-start left-0 top-[4.5px] w-[76.07px]" data-name="Label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[13.125px] not-italic relative shrink-0 text-[#0c0c0d] text-[13.125px] whitespace-nowrap">Сообщение</p>
    </div>
  );
}

function Textarea() {
  return (
    <div className="absolute bg-[#f2f4f7] h-[92px] left-0 rounded-[7.375px] top-[30px] w-[358px]" data-name="Textarea">
      <div className="content-stretch flex items-start overflow-clip px-[11.25px] py-[7.5px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] not-italic relative shrink-0 text-[#5b6471] text-[13.125px] whitespace-nowrap">Опишите ваш вопрос или задачу...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e1e5ea] border-solid inset-0 pointer-events-none rounded-[7.375px]" />
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[122px] relative shrink-0 w-full" data-name="Container">
      <Label3 />
      <Textarea />
    </div>
  );
}

function Icon35() {
  return (
    <div className="absolute left-[129.27px] size-[15px] top-[11.25px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_736)" id="Icon">
          <path d={svgPaths.p3eb2d400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p36f85800} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_736">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#1a65c7] h-[37.5px] relative rounded-[13.375px] shrink-0 w-full" data-name="Button">
      <Icon35 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18.75px] left-[194.27px] not-italic text-[13.125px] text-center text-white top-[9.88px] whitespace-nowrap">Отправить</p>
    </div>
  );
}

function ContactSection4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] h-[422px] items-start left-[22.5px] top-[114.38px] w-[358px]" data-name="ContactSection">
      <Container40 />
      <Container41 />
      <Container42 />
      <Container43 />
      <Button />
    </div>
  );
}

function Card16() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] border border-[rgba(225,229,234,0.5)] border-solid h-[560.875px] left-[435px] rounded-[15px] shadow-[0px_4px_6px_0px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.04)] top-0 w-[405px]" data-name="Card">
      <CardHeader7 />
      <ContactSection4 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute h-[560.875px] left-[280px] top-[165px] w-[840px]" data-name="Container">
      <Card15 />
      <Card16 />
    </div>
  );
}

function ContactSection() {
  return (
    <div className="absolute h-[725.875px] left-[34px] top-[4604.5px] w-[1400px]" data-name="ContactSection">
      <Container32 />
      <Container33 />
    </div>
  );
}

function Container45() {
  return <div className="absolute bg-[rgba(26,101,199,0.05)] blur-[64px] left-[434px] rounded-[9999px] size-[600px] top-[-300px]" data-name="Container" />;
}

function Container44() {
  return (
    <div className="absolute h-[945.5px] left-0 overflow-clip top-0 w-[1468px]" data-name="Container">
      <Container45 />
    </div>
  );
}

function Icon36() {
  return (
    <div className="absolute left-[15px] size-[15px] top-[7.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p1950ab00} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute h-[18.75px] left-[37.5px] top-[5.63px] w-[213.555px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18.75px] left-[107.5px] not-italic text-[#1a65c7] text-[13.125px] text-center top-[0.5px] whitespace-nowrap">Надёжный контроль телематики</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute bg-[rgba(26,101,199,0.05)] border border-[rgba(26,101,199,0.2)] border-solid h-[32px] left-[225.97px] rounded-[9999px] top-0 w-[268.055px]" data-name="Container">
      <Icon36 />
      <Text17 />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[112.5px] left-0 top-[54.5px] w-[720px]" data-name="Heading 1">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[0] left-[360px] not-italic text-[#0c0c0d] text-[56.25px] text-center top-[-0.5px] tracking-[-1.4063px] w-[720px]">
        <span className="leading-[56.25px]">{`Контроль пропусков и РНИС `}</span>
        <span className="leading-[56.25px] text-[#1a65c7]">в одном сервисе</span>
      </p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute h-[105px] left-[45px] top-[189.5px] w-[630px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[26.25px] left-[315px] not-italic text-[#5b6471] text-[18.75px] text-center top-0 w-[630px]">Автоматический мониторинг статуса пропусков МКАД/ТТК, регистрации в РНИС и телеметрии ваших транспортных средств. Получайте уведомления о проблемах до того, как они станут критичными.</p>
    </div>
  );
}

function Icon37() {
  return (
    <div className="absolute left-[178.04px] size-[15px] top-[15px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d="M3.125 7.5H11.875" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.pb698300} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function SlotSlotClone5() {
  return (
    <div className="bg-[#1a65c7] h-[45px] relative rounded-[13.375px] shrink-0 w-[223.039px]" data-name="Slot.SlotClone">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] left-[97.5px] not-italic text-[15px] text-center text-white top-[10.75px] whitespace-nowrap">Начать бесплатно</p>
        <Icon37 />
      </div>
    </div>
  );
}

function SlotSlotClone6() {
  return (
    <div className="h-[45px] relative rounded-[13.375px] shrink-0 w-[170.742px]" data-name="Slot.SlotClone">
      <div aria-hidden="true" className="absolute border border-[#e1e5ea] border-solid inset-0 pointer-events-none rounded-[13.375px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[31px] py-px relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] not-italic relative shrink-0 text-[#0c0c0d] text-[15px] text-center whitespace-nowrap">Узнать больше</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex gap-[15px] h-[45px] items-start justify-center left-0 px-[155.609px] top-[324.5px] w-[720px]" data-name="Container">
      <SlotSlotClone5 />
      <SlotSlotClone6 />
    </div>
  );
}

function Icon38() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p3c5a0560} id="Vector" stroke="var(--stroke-0, #5B6471)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d="M11.7188 14.0625H7.03125" id="Vector_2" stroke="var(--stroke-0, #5B6471)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p3bdfd680} id="Vector_3" stroke="var(--stroke-0, #5B6471)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p2e8af070} id="Vector_4" stroke="var(--stroke-0, #5B6471)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
          <path d={svgPaths.p17e3b040} id="Vector_5" stroke="var(--stroke-0, #5B6471)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="flex-[1_0_0] h-[18.75px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-[94px] not-italic text-[#5b6471] text-[13.125px] text-center top-[0.5px] whitespace-nowrap">1000+ транспортных средств</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex gap-[7.5px] h-[18.75px] items-center left-[181.89px] top-0 w-[214.602px]" data-name="Container">
      <Icon38 />
      <Text18 />
    </div>
  );
}

function Icon39() {
  return (
    <div className="relative shrink-0 size-[18.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.75 18.75">
        <g id="Icon">
          <path d={svgPaths.p2ffee4f2} id="Vector" stroke="var(--stroke-0, #5B6471)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5625" />
        </g>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="flex-[1_0_0] h-[18.75px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-[43.5px] not-italic text-[#5b6471] text-[13.125px] text-center top-[0.5px] whitespace-nowrap">99.9% uptime</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex gap-[7.5px] h-[18.75px] items-center left-[426.49px] top-0 w-[111.609px]" data-name="Container">
      <Icon39 />
      <Text19 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute h-[18.75px] left-0 top-[414.5px] w-[720px]" data-name="Container">
      <Container51 />
      <Container52 />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute h-[433.25px] left-[340px] top-[105px] w-[720px]" data-name="Container">
      <Container48 />
      <Heading />
      <Paragraph14 />
      <Container49 />
      <Container50 />
    </div>
  );
}

function Container56() {
  return <div className="bg-[#f87171] rounded-[9999px] shrink-0 size-[7.5px]" data-name="Container" />;
}

function Container57() {
  return <div className="bg-[#fbbf24] rounded-[9999px] shrink-0 size-[7.5px]" data-name="Container" />;
}

function Container58() {
  return <div className="bg-[#4ade80] flex-[1_0_0] h-[7.5px] min-h-px min-w-px rounded-[9999px]" data-name="Container" />;
}

function Container55() {
  return (
    <div className="h-[7.5px] relative shrink-0 w-[33.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[5.625px] items-start relative size-full">
        <Container56 />
        <Container57 />
        <Container58 />
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[15px] relative shrink-0 w-[131.492px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-0 not-italic text-[#5b6471] text-[11.25px] top-[-0.5px] whitespace-nowrap">Мониторинг автопарка</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute bg-[rgba(234,236,241,0.3)] content-stretch flex gap-[15px] h-[34.75px] items-center left-0 pb-[10.375px] pt-[9.375px] px-[15px] top-0 w-[628px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(225,229,234,0.4)] border-b border-solid inset-0 pointer-events-none" />
      <Container55 />
      <Text20 />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute h-[30.5px] left-0 top-0 w-[149.055px]" data-name="Header Cell">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[15px] not-italic text-[#5b6471] text-[11.25px] top-[7px] whitespace-nowrap">Госномер</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute h-[30.5px] left-[149.05px] top-0 w-[90.813px]" data-name="Header Cell">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[45.04px] not-italic text-[#5b6471] text-[11.25px] text-center top-[7px] whitespace-nowrap">Пропуск</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="absolute h-[30.5px] left-[239.87px] top-0 w-[70.875px]" data-name="Header Cell">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[36.39px] not-italic text-[#5b6471] text-[11.25px] text-center top-[7px] whitespace-nowrap">РНИС</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="absolute h-[30.5px] left-[310.74px] top-0 w-[115.305px]" data-name="Header Cell">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[57.68px] not-italic text-[#5b6471] text-[11.25px] text-center top-[7px] whitespace-nowrap">Телеметрия</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="absolute h-[30.5px] left-[426.05px] top-0 w-[79.555px]" data-name="Header Cell">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[39.82px] not-italic text-[#5b6471] text-[11.25px] text-center top-[7px] whitespace-nowrap">ОСАГО</p>
    </div>
  );
}

function HeaderCell5() {
  return (
    <div className="absolute h-[30.5px] left-[505.6px] top-0 w-[114.898px]" data-name="Header Cell">
      <p className="-translate-x-full absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[99.9px] not-italic text-[#5b6471] text-[11.25px] text-right top-[7px] whitespace-nowrap">Статус</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute h-[30.5px] left-0 top-0 w-[620.5px]" data-name="Table Row">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
      <HeaderCell5 />
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[46px] left-0 top-[-1px] w-[149.055px]" data-name="Table Cell">
      <p className="absolute font-['Menlo:Semi_Bold',sans-serif] leading-[18.75px] left-[15px] not-italic text-[#0c0c0d] text-[13.125px] top-[14.75px] whitespace-nowrap">А 123 МО 77</p>
    </div>
  );
}

function Icon40() {
  return (
    <div className="absolute left-[37.91px] size-[15px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_709)" id="Icon">
          <path d={svgPaths.p318b9b00} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1d927000} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_709">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[46px] left-[149.05px] top-[-1px] w-[90.813px]" data-name="Table Cell">
      <Icon40 />
    </div>
  );
}

function Icon41() {
  return (
    <div className="absolute left-[27.94px] size-[15px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_709)" id="Icon">
          <path d={svgPaths.p318b9b00} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1d927000} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_709">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[46px] left-[239.87px] top-[-1px] w-[70.875px]" data-name="Table Cell">
      <Icon41 />
    </div>
  );
}

function Icon42() {
  return (
    <div className="absolute left-[50.15px] size-[15px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_709)" id="Icon">
          <path d={svgPaths.p318b9b00} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1d927000} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_709">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[46px] left-[310.74px] top-[-1px] w-[115.305px]" data-name="Table Cell">
      <Icon42 />
    </div>
  );
}

function Icon43() {
  return (
    <div className="absolute left-[32.27px] size-[15px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_709)" id="Icon">
          <path d={svgPaths.p318b9b00} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1d927000} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_709">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[46px] left-[426.05px] top-[-1px] w-[79.555px]" data-name="Table Cell">
      <Icon43 />
    </div>
  );
}

function Text21() {
  return (
    <div className="absolute bg-[#dcfce7] h-[18.75px] left-[68.46px] rounded-[9999px] top-[15.38px] w-[31.438px]" data-name="Text">
      <p className="-translate-x-full absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[24.5px] not-italic text-[#15803d] text-[11.25px] text-right top-[1.38px] whitespace-nowrap">OK</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[46px] left-[505.6px] top-[-1px] w-[114.898px]" data-name="Table Cell">
      <Text21 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute border-[rgba(225,229,234,0.3)] border-solid border-t h-[46px] left-0 top-0 w-[620.5px]" data-name="Table Row">
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[46px] left-0 top-[-1px] w-[149.055px]" data-name="Table Cell">
      <p className="absolute font-['Menlo:Semi_Bold',sans-serif] leading-[18.75px] left-[15px] not-italic text-[#0c0c0d] text-[13.125px] top-[14.75px] whitespace-nowrap">В 456 КР 99</p>
    </div>
  );
}

function Icon44() {
  return (
    <div className="absolute left-[37.91px] size-[15px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_709)" id="Icon">
          <path d={svgPaths.p318b9b00} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1d927000} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_709">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[46px] left-[149.05px] top-[-1px] w-[90.813px]" data-name="Table Cell">
      <Icon44 />
    </div>
  );
}

function Icon45() {
  return (
    <div className="absolute left-[27.94px] size-[15px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_709)" id="Icon">
          <path d={svgPaths.p318b9b00} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1d927000} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_709">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[46px] left-[239.87px] top-[-1px] w-[70.875px]" data-name="Table Cell">
      <Icon45 />
    </div>
  );
}

function Icon46() {
  return (
    <div className="absolute left-[50.15px] size-[15px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_704)" id="Icon">
          <path d={svgPaths.p185087f0} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M9.375 5.625L5.625 9.375" id="Vector_2" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M5.625 5.625L9.375 9.375" id="Vector_3" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_704">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[46px] left-[310.74px] top-[-1px] w-[115.305px]" data-name="Table Cell">
      <Icon46 />
    </div>
  );
}

function Icon47() {
  return (
    <div className="absolute left-[32.27px] size-[15px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_709)" id="Icon">
          <path d={svgPaths.p318b9b00} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p1d927000} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_709">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[46px] left-[426.05px] top-[-1px] w-[79.555px]" data-name="Table Cell">
      <Icon47 />
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute bg-[#fee2e2] h-[18.75px] left-[39.79px] rounded-[9999px] top-[15.38px] w-[60.109px]" data-name="Text">
      <p className="-translate-x-full absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[53.5px] not-italic text-[#b91c1c] text-[11.25px] text-right top-[1.38px] whitespace-nowrap">Ошибка</p>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[46px] left-[505.6px] top-[-1px] w-[114.898px]" data-name="Table Cell">
      <Text22 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute bg-[rgba(254,242,242,0.4)] border-[rgba(225,229,234,0.3)] border-solid border-t h-[46px] left-0 top-[46px] w-[620.5px]" data-name="Table Row">
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[45.5px] left-0 top-[-1px] w-[149.055px]" data-name="Table Cell">
      <p className="absolute font-['Menlo:Semi_Bold',sans-serif] leading-[18.75px] left-[15px] not-italic text-[13.125px] text-[rgba(12,12,13,0.4)] top-[14.75px] whitespace-nowrap">Е 789 АВ 50</p>
    </div>
  );
}

function Icon48() {
  return (
    <div className="absolute left-[37.91px] size-[15px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_700)" id="Icon">
          <path d={svgPaths.p318b9b00} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.25" />
          <path d={svgPaths.p1d927000} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_700">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[45.5px] left-[149.05px] top-[-1px] w-[90.813px]" data-name="Table Cell">
      <Icon48 />
    </div>
  );
}

function Icon49() {
  return (
    <div className="absolute left-[27.94px] size-[15px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_700)" id="Icon">
          <path d={svgPaths.p318b9b00} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.25" />
          <path d={svgPaths.p1d927000} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_700">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute h-[45.5px] left-[239.87px] top-[-1px] w-[70.875px]" data-name="Table Cell">
      <Icon49 />
    </div>
  );
}

function Icon50() {
  return (
    <div className="absolute left-[50.15px] size-[15px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_700)" id="Icon">
          <path d={svgPaths.p318b9b00} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.25" />
          <path d={svgPaths.p1d927000} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_700">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="absolute h-[45.5px] left-[310.74px] top-[-1px] w-[115.305px]" data-name="Table Cell">
      <Icon50 />
    </div>
  );
}

function Icon51() {
  return (
    <div className="absolute left-[32.27px] size-[15px] top-[15.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_700)" id="Icon">
          <path d={svgPaths.p318b9b00} id="Vector" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.25" />
          <path d={svgPaths.p1d927000} id="Vector_2" stroke="var(--stroke-0, #22C55E)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_700">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="absolute h-[45.5px] left-[426.05px] top-[-1px] w-[79.555px]" data-name="Table Cell">
      <Icon51 />
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute bg-[rgba(220,252,231,0.4)] h-[18.75px] left-[68.46px] rounded-[9999px] top-[15.38px] w-[31.438px]" data-name="Text">
      <p className="-translate-x-full absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[24.5px] not-italic text-[11.25px] text-[rgba(21,128,61,0.4)] text-right top-[1.38px] whitespace-nowrap">OK</p>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="absolute h-[45.5px] left-[505.6px] top-[-1px] w-[114.898px]" data-name="Table Cell">
      <Text23 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute border-[rgba(225,229,234,0.3)] border-solid border-t h-[45.5px] left-0 top-[92px] w-[620.5px]" data-name="Table Row">
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
      <TableCell17 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[137.5px] left-0 top-[30.5px] w-[620.5px]" data-name="Table Body">
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
    </div>
  );
}

function Table() {
  return (
    <div className="absolute h-[168px] left-[3.75px] top-[38.5px] w-[620.5px]" data-name="Table">
      <TableRow />
      <TableBody />
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute bg-white border border-[rgba(225,229,234,0.6)] border-solid h-[212.25px] left-0 overflow-clip rounded-[13.375px] shadow-[0px_25px_50px_-12px_rgba(26,101,199,0.05)] top-0 w-[630px]" data-name="Container">
      <Container54 />
      <Table />
    </div>
  );
}

function Icon52() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p18897900} id="Vector" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M7.5 5.625V8.125" id="Vector_2" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d="M7.5 10.625H7.50625" id="Vector_3" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Container60() {
  return (
    <div className="bg-[#fee2e2] relative rounded-[9999px] shrink-0 size-[30px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[7.5px] relative size-full">
        <Icon52 />
      </div>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="absolute h-[15px] left-0 top-0 w-[204.25px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-0 not-italic text-[#0c0c0d] text-[11.25px] top-[-0.5px] whitespace-nowrap">Проблема с телеметрией</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute h-[30px] left-0 top-[16.88px] w-[204.25px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#5b6471] text-[11.25px] top-[-0.5px] w-[205px]">В 456 КР 99 — нет данных телеметрии более 24ч</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute h-[15px] left-0 top-[50.63px] w-[204.25px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-[rgba(91,100,113,0.6)] top-[0.5px] whitespace-nowrap">2 минуты назад</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="flex-[1_0_0] h-[65.625px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph15 />
        <Paragraph16 />
        <Paragraph17 />
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[11.25px] h-[90.125px] items-start left-[375px] p-[12.25px] rounded-[9.375px] top-[60px] w-[270px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.6)] border-solid inset-0 pointer-events-none rounded-[9.375px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
      <Container60 />
      <Container61 />
    </div>
  );
}

function Icon53() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_693)" id="Icon">
          <path d={svgPaths.p390a5700} id="Vector" stroke="var(--stroke-0, #1A65C7)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_693">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container63() {
  return (
    <div className="bg-[rgba(26,101,199,0.1)] relative rounded-[9.375px] shrink-0 size-[33.75px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[9.375px] relative size-full">
        <Icon53 />
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#5b6471] text-[11.25px] top-[-0.5px] whitespace-nowrap">Последняя проверка</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18.75px] left-0 not-italic text-[#0c0c0d] text-[13.125px] top-[0.5px] whitespace-nowrap">12 мин. назад</p>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[33.75px] relative shrink-0 w-[116.422px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph18 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[9.375px] h-[54.5px] items-center left-[-11.25px] p-[10.375px] rounded-[9.375px] top-[150.25px] w-[210px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(225,229,234,0.6)] border-solid inset-0 pointer-events-none rounded-[9.375px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Container63 />
      <Container64 />
    </div>
  );
}

function HeroIllustration() {
  return (
    <div className="absolute h-[212.25px] left-[385px] top-[598.25px] w-[630px]" data-name="HeroIllustration">
      <Container53 />
      <Container59 />
      <Container62 />
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute h-[945.5px] left-[34px] top-0 w-[1400px]" data-name="Container">
      <Container47 />
      <HeroIllustration />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="absolute bg-gradient-to-b from-[rgba(26,101,199,0.05)] h-[945.5px] left-0 to-[#f2f4f7] top-0 via-1/2 via-[#f2f4f7] w-[1468px]" data-name="HeroSection">
      <Container44 />
      <Container46 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[5435.375_0_0] min-h-px min-w-px relative w-[1468px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <LandingVideoSection />
        <FeaturesSection />
        <PartnersSection />
        <PricingSection />
        <CheckLinksSection />
        <ContactSection />
        <HeroSection />
      </div>
    </div>
  );
}

function LandingFooter1() {
  return (
    <div className="relative rounded-[9999px] shrink-0 size-[33.75px]" data-name="LandingFooter">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[9999px] size-full" src={imgLandingFooter} />
    </div>
  );
}

function LandingFooter2() {
  return (
    <div className="h-[26.25px] relative shrink-0 w-[163.992px]" data-name="LandingFooter">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[26.25px] left-0 not-italic text-[#0c0c0d] text-[18.75px] top-0 whitespace-nowrap">РНИС КОНТРОЛЬ</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute content-stretch flex gap-[11.25px] h-[33.75px] items-center left-0 top-0 w-[244px]" data-name="Link">
      <LandingFooter1 />
      <LandingFooter2 />
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute h-[75px] left-0 top-[48.75px] w-[244px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] w-[244px]">Автоматизированный мониторинг пропусков, регистрации в РНИС и телеметрии для грузового транспорта.</p>
    </div>
  );
}

function Icon54() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g clipPath="url(#clip0_1_713)" id="Icon">
          <path d={svgPaths.p23061a80} id="Vector" stroke="var(--stroke-0, #5B6471)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
        <defs>
          <clipPath id="clip0_1_713">
            <rect fill="white" height="15" width="15" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-[124.523px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">+7 (495) 487-50-07</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex gap-[7.5px] h-[18.75px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon54 />
      <Text24 />
    </div>
  );
}

function Icon55() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Icon">
          <path d={svgPaths.p221d0a70} id="Vector" stroke="var(--stroke-0, #5B6471)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
          <path d={svgPaths.p52f9500} id="Vector_2" stroke="var(--stroke-0, #5B6471)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
        </g>
      </svg>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-[116.414px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] whitespace-nowrap">info@rniscontrol.ru</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex gap-[7.5px] h-[18.75px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon55 />
      <Text25 />
    </div>
  );
}

function Icon56() {
  return (
    <div className="h-[15px] relative shrink-0 w-[14.086px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0859 15">
        <g id="Icon">
          <path d={svgPaths.p29ad5800} id="Vector" stroke="var(--stroke-0, #5B6471)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.17383" />
          <path d={svgPaths.p30cb5e80} id="Vector_2" stroke="var(--stroke-0, #5B6471)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.17383" />
        </g>
      </svg>
    </div>
  );
}

function Text26() {
  return (
    <div className="flex-[1_0_0] h-[37.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[0.5px] w-[223px]">Москва, Долгопрудненское шоссе, 3</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex gap-[7.5px] h-[37.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon56 />
      <Text26 />
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.5px] h-[90px] items-start left-0 top-[146.25px] w-[244px]" data-name="Container">
      <Container69 />
      <Container70 />
      <Container71 />
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[11.25px] text-[rgba(91,100,113,0.7)] top-[-0.5px] whitespace-nowrap">ИП Свиридов А.С.</p>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[11.25px] text-[rgba(91,100,113,0.7)] top-[-0.5px] whitespace-nowrap">ИНН 500804578356</p>
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[11.25px] text-[rgba(91,100,113,0.7)] top-[-0.5px] whitespace-nowrap">ОГРНИП 316504700055365</p>
    </div>
  );
}

function Container72() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.75px] h-[52.5px] items-start left-0 top-[251.25px] w-[244px]" data-name="Container">
      <Paragraph21 />
      <Paragraph22 />
      <Paragraph23 />
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute h-[303.75px] left-0 top-0 w-[244px]" data-name="Container">
      <Link />
      <Paragraph20 />
      <Container68 />
      <Container72 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[26.25px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-0 not-italic text-[#0c0c0d] text-[16.875px] top-0 tracking-[-0.3375px] whitespace-nowrap">Продукт</p>
    </div>
  );
}

function ListItem24() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Возможности</p>
    </div>
  );
}

function ListItem25() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Тарифы</p>
    </div>
  );
}

function ListItem26() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Блог</p>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[7.5px] h-[82.5px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem24 />
      <ListItem25 />
      <ListItem26 />
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] h-[303.75px] items-start left-[274px] top-0 w-[244px]" data-name="Container">
      <Heading12 />
      <List />
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[26.25px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-0 not-italic text-[#0c0c0d] text-[16.875px] top-0 tracking-[-0.3375px] whitespace-nowrap">Проверки</p>
    </div>
  );
}

function ListItem27() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Проверить пропуск МКАД</p>
    </div>
  );
}

function ListItem28() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Проверить пропуск ТТК</p>
    </div>
  );
}

function ListItem29() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Проверить пропуск по номеру</p>
    </div>
  );
}

function ListItem30() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Проверить РНИС</p>
    </div>
  );
}

function ListItem31() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Проверить РНИС по номеру</p>
    </div>
  );
}

function ListItem32() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Проверить телеметрию</p>
    </div>
  );
}

function ListItem33() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Проверить ГЛОНАСС</p>
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[7.5px] h-[202.5px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem27 />
      <ListItem28 />
      <ListItem29 />
      <ListItem30 />
      <ListItem31 />
      <ListItem32 />
      <ListItem33 />
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] h-[303.75px] items-start left-[548px] top-0 w-[244px]" data-name="Container">
      <Heading13 />
      <List1 />
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[26.25px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-0 not-italic text-[#0c0c0d] text-[16.875px] top-0 tracking-[-0.3375px] whitespace-nowrap">Полезное</p>
    </div>
  );
}

function ListItem34() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Передача данных в РНИС</p>
    </div>
  );
}

function ListItem35() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Транспорт не передаёт данные</p>
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex flex-col gap-[7.5px] h-[52.5px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem34 />
      <ListItem35 />
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] h-[303.75px] items-start left-[822px] top-0 w-[244px]" data-name="Container">
      <Heading14 />
      <List2 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="h-[26.25px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[26.25px] left-0 not-italic text-[#0c0c0d] text-[16.875px] top-0 tracking-[-0.3375px] whitespace-nowrap">Компания</p>
    </div>
  );
}

function ListItem36() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Партнёрам</p>
    </div>
  );
}

function ListItem37() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Контакты</p>
    </div>
  );
}

function ListItem38() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Политика конфиденциальности</p>
    </div>
  );
}

function ListItem39() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-0 not-italic text-[#5b6471] text-[13.125px] top-[3.5px] whitespace-nowrap">Договор-оферта</p>
    </div>
  );
}

function List3() {
  return (
    <div className="content-stretch flex flex-col gap-[7.5px] h-[112.5px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem36 />
      <ListItem37 />
      <ListItem38 />
      <ListItem39 />
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15px] h-[303.75px] items-start left-[1096px] top-0 w-[244px]" data-name="Container">
      <Heading15 />
      <List3 />
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[303.75px] relative shrink-0 w-full" data-name="Container">
      <Container67 />
      <Container73 />
      <Container74 />
      <Container75 />
      <Container76 />
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="h-[18.75px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.75px] left-[670.36px] not-italic text-[#5b6471] text-[13.125px] text-center top-[0.5px] whitespace-nowrap">© 2026 РНИС КОНТРОЛЬ. Все права защищены.</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col h-[49.75px] items-start pt-[31px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e1e5ea] border-solid border-t inset-0 pointer-events-none" />
      <Paragraph24 />
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[518.5px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[45px] items-start pt-[60px] px-[30px] relative size-full">
        <Container66 />
        <Container77 />
      </div>
    </div>
  );
}

function LandingFooter() {
  return (
    <div className="bg-[rgba(234,236,241,0.3)] h-[519.5px] relative shrink-0 w-[1468px]" data-name="LandingFooter">
      <div aria-hidden="true" className="absolute border-[#e1e5ea] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-px px-[34px] relative size-full">
        <Container65 />
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="content-stretch flex flex-col h-[6015.875px] items-start pt-[61px] relative shrink-0 w-full" data-name="LandingPage">
      <MainContent />
      <LandingFooter />
    </div>
  );
}

export default function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Body">
      <NotificationsF />
      <LandingPage />
    </div>
  );
}