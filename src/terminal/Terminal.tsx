import "./Terminal.css";


export interface Message {
  type: string;
  message: number;
}

function Terminal(props: any) {
  return (
    <div className="Terminal">
      <div className="fakeMenu" style={{width:"750px!important"}}>
        <div className="fakeButtons fakeClose"></div>
        <div className="fakeButtons fakeMinimize"></div>
        <div className="fakeButtons fakeZoom"></div>
      </div>
      <div className="fakeScreen">
        {props.message
          .slice(0)
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
