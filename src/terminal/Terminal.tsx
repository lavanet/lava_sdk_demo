import "./Terminal.css";
import { Message } from "../app/App";

function Terminal(props: any) {
  return (
    <div className="Terminal">
      <div className="fakeMenu">
        <div className="fakeButtons fakeClose"></div>
        <div className="fakeButtons fakeMinimize"></div>
        <div className="fakeButtons fakeZoom"></div>
      </div>
      <div className="fakeScreen">
        {props.message
          .slice(0)
          .reverse()
          .map((item: Message, index: any) => {
            return (
              <div className="terminalItem" key={index}>
                {
                  <>
                    <span className={item.type}>{item.type}: </span>
                    {item.message}
                  </>
                }
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Terminal;
