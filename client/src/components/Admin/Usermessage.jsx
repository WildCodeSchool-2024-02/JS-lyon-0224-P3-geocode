/*
const UsermessageTable = () => {
  const [userData, setUserData] = useState(data);

  const onChangeInput = (e, UsermessageId) => {
    const { name, value } = e.target;

    const UsermessageData = UsermessageData.map((item) =>
      item.UsermessageId === UsermessageId && name
        ? { ...item, [name]: value }
        : item
    );

    setUsermessageData(UsermessageData);
  };

  return (
    <div className="container">
      <h1 className="title">User message</h1>
      <table>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {userData.map(
            ({ userId, Firstname, Lastname, email, Subject, Message }) => (
              <tr key={UsermessageId}>
                <td>
                  <input
                    name="Firstname"
                    value={Firstname}
                    type="text"
                    onChange={(e) => onChangeInput(e, UsermessageId)}
                    placeholder="Type Firstname"
                  />
                </td>

                <td>
                  <input
                    name="Lastname"
                    value={Lastname}
                    type="text"
                    onChange={(e) => onChangeInput(e, UsermessageId)}
                    placeholder="Type Lastname"
                  />
                </td>

                <td>
                  <input
                    name="email"
                    value={email}
                    type="text"
                    onChange={(e) => onChangeInput(e, UsermessageId)}
                    placeholder="Type Email"
                  />
                </td>
                <td>
                  <input
                    name="Subject"
                    value={Subject}
                    type="text"
                    onChange={(e) => onChangeInput(e, UsermessageId)}
                    placeholder="Type Subject"
                  />
                </td>
                <td>
                  <input
                    name="Message"
                    value={Message}
                    type="text"
                    onChange={(e) => onChangeInput(e, UsermessageId)}
                    placeholder="Type Message"
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsermessageTable;
*/