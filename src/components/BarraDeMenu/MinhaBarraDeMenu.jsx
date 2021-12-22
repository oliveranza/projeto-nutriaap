import { Button } from "primereact/button";
import { useState } from "react";
import React from "react";

import "./MinhaBarraDeMenu.css"

export default function MinhaBarraDeMenu(props) {
  const [botoes, setBotoes] = useState(props.modelo);
  const activeTab = props.tab

  return (
    <div className="minhaBarraDeMenu">
      {botoes.map((ele,i) => {
          return (
            <Button
              label={ele.label || null}
              icon={ele.icon || null}
              iconPos={ele.iconPos || null}
              onClick={e => window.location.href= ele.url || null}
              style={activeTab===i? {backgroundColor:"white",color:"#22b2abbf"}:null}
            ></Button>
          );
        })
      }
    
    </div>
  );
}
