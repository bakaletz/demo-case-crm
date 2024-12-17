import React from 'react';

export const Contacts = () => {
  return (
   <div>
    <div className="content">
  <section className="about-us">
    <h2>Про компанію</h2>
    <p>...</p>
  </section>

  <section className="office-gallery">
    <h2>Наші офіси</h2>
    <div className="gallery">
      <img src="..." alt="Офіс 1" />
      <img src="..." alt="Офіс 2" />
      <img src="..." alt="Офіс 3" />
    </div>
  </section>

  <section className="services">
    <h2>Наші послуги</h2>
    <ul>
      <li>Корпоративне право</li>
      <li>Податкові консультації</li>
      <li>Адвокатська допомога у кримінальних справах</li>
      <li>Юридична підтримка стартапів</li>
    </ul>
  </section>

  <section className="team">
    <h2>Наша команда</h2>
    <p>Ми пишаємося командою професіоналів...</p>
    <div className="team-photo">
      <img src="..." alt="Адвокат 1" />
      <img src="..." alt="Адвокат 2" />
      <img src="..." alt="Адвокат 3" />
    </div>
  </section>
</div>
</div>
  );
}


