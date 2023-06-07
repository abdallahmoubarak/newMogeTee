import axios from "axios";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

export default function TopBar({ categories, state, setState, main }) {
  const [add, setAdd] = useState(true);
  const [name, setName] = useState();
  return (
    <>
      <div className="bar">
        {categories?.map((category, i) => (
          <a key={i} href={`#${category.name}`}>
            <div
              className={`item ${category.name === state && "active"}`}
              style={{ color: category.topTitle }}
            >
              <div onClick={() => setState(category.name)}>{category.name}</div>
              {!main && (
                <div className="trash" onClick={() => alert("delete category")}>
                  <FiTrash2 />
                </div>
              )}
            </div>
          </a>
        ))}
        {!main && (
          <div className="item">
            {add ? (
              <div onClick={() => setAdd(false)}>+</div>
            ) : (
              <div>
                <input onChange={(e) => setName(e.target.value)} />
                <span
                  className="gold"
                  onClick={() =>
                    axios
                      .post(
                        "/api/categories",
                        { name },
                        { "content-type": "application/json" }
                      )
                      .then((res) => {
                        if (res.data === "done") {
                          setName();
                          setAdd(true);
                        }
                      })
                  }
                >
                  add
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="topbar"></div>

      <style jsx>{`
        .bar {
          padding: 0.6rem;
          overflow: auto;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          gap: 0.8rem;
          width: 100%;
          position: fixed;
          position: -webkit-fixed;
          top: 0;
          background: white;
          z-index: 10;
        }
        .item {
          white-space: nowrap;
          -webkit-box-shadow: 0 0px 5px 0 grey;
          box-shadow: 0 0px 5px 0 grey;
          padding: 0.2rem 0.8rem;
          border-radius: 10rem;
          font-size: 1rem;
          cursor: pointer;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          gap: 0.6rem;
        }
        .topbar {
          margin-top: 3rem;
        }
        .active {
          font-size: 1.4rem;
        }
        input {
          border: none;
          font-size: 1rem;
          width: 5rem;
        }
        .gold {
          color: #b39d25;
        }
        .trash {
          padding-top: 0.1rem;
        }
      `}</style>
    </>
  );
}
