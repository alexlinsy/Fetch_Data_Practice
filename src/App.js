import { useState, useEffect, useRef } from "react";
import "./styles.css";

export default function App() {
  const [usersInfo, setUsersInfo] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const getUsers = useRef(() => {});
  getUsers.current = async () => {
    const respond = await fetch(`https://randomuser.me/api?page=${pageNumber}`);
    const users = await respond.json();
    if (users === undefined) return;
    const { first, last } = users.results[0].name;
    const { medium } = users.results[0].picture;
    const newUsersInfo = [
      ...usersInfo,
      {
        firstName: first,
        lastName: last,
        photo: medium
      }
    ];
    setUsersInfo(newUsersInfo);
    setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    getUsers.current();
  }, []);

  console.log(usersInfo);

  return (
    <div className="App">
      <button
        onClick={() => getUsers.current()}
        style={{ marginBottom: "20px" }}
      >
        Next Page
      </button>
      {usersInfo.map((user, index) => (
        <div key={index}>
          <img alt="avatar" src={user.photo} />
          <p>{`${user.firstName} ${user.lastName}`}</p>
        </div>
      ))}
    </div>
  );
}
