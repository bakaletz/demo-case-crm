export const Faq = () => {
  return (
    <div className="content">
      <section className="title">
        <h1>Internal Questions and Answers for Legal Firm Employees</h1>
      </section>

      {/* FAQ Sections */}
      <section>
        <h2>What communication channels are used internally?</h2>
        <p>
          The primary communication tool is the corporate chat in Microsoft Teams. Official documentation 
          and announcements from management are sent via email. Important updates are also available on 
          the internal portal in the news section.
        </p>
      </section>

      <section>
        <h2>How to report legal or corporate issues?</h2>
        <p>If you have questions or notice an issue:</p>
        <ol>
          <li>Inform your direct manager.</li>
          <li>Use the feedback form on the corporate portal.</li>
          <li>
            For anonymous reporting, use the special form on the internal security portal.
          </li>
        </ol>
      </section>

      <section>
        <h2>Is remote work allowed?</h2>
        <p>
          The company supports a hybrid work format. Lawyers and other employees can work remotely 
          with prior approval from their manager and the HR department. Required documents must be 
          available in the corporate file storage system.
        </p>
      </section>

      <section>
        <h2>What are the conditions for vacations and sick leave?</h2>
        <p>Employees are entitled to 24 calendar days of paid vacation. Additional provisions include:</p>
        <ul>
          <li>Sick leave — with a valid medical certificate</li>
          <li>Maternity leave</li>
          <li>Unpaid leave (up to 15 days per year)</li>
        </ul>
      </section>

      <section>
        <h2>How to apply for training or professional development courses?</h2>
        <p>For employees' professional development:</p>
        <ol>
          <li>Discuss the possibility of training with your manager.</li>
          <li>Submit an application through the "Training and Development" section on the internal portal.</li>
          <li>If the training requires funding, coordinate it with the HR department.</li>
        </ol>
      </section>

      <section>
        <h2>How to report a conflict or ethical issue?</h2>
        <p>If conflict situations arise:</p>
        <ol>
          <li>Try to resolve the issue directly with colleagues.</li>
          <li>If this does not help, contact your manager.</li>
          <li>
            For serious conflicts or ethical violations, submit an anonymous complaint on the portal.
          </li>
        </ol>
      </section>

      <section>
        <h2>Whom to contact with technical issues?</h2>
        <p>For equipment or software-related questions, contact the IT department:</p>
        <ul>
          <li>Support portal: "IT Support" section</li>
          <li>Microsoft Teams chat: <b>#it-support</b></li>
          <li>Email: <a href="mailto:it.support@legalfirm.com">it.support@legalfirm.com</a></li>
        </ul>
      </section>
    </div>
  );
};
