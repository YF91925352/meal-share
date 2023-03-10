import { useState, useEffect } from "react";

export default function Meallist() {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/meals");
      const data = await res.json();
      setList(data);
    })();
  }, []);
  console.log(list);
  return (
    <div>
      <h1>Meal List</h1>
      <ul>
        {list.map((item) => (
          <li>
            <span>Meal Title:{item.title}</span>
            <br />
            <span>Meal Description:{item.description}</span>
            <br />
            <span>Meal Price:{item.price}</span>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
