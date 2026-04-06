

import { useTranslation } from 'react-i18next';

const HowPeople = () => {
  const { t } = useTranslation();


  

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingTop: "50px", alignItems: "center" }}>


      <h1> {t('how_many_people')} ?</h1>
      <h4> {t('how_many_people_text')} </h4>



      
    </div>
  );
};

export default HowPeople;
