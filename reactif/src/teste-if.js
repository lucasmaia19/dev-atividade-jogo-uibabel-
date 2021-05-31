import React, { useState } from "react";

import { If } from 'react-if';

const TesteIf = () => {

  const [teste, setTeste] = useState(true);

  return (
    <div>
        <If condition={teste}>
          oioioi
        </If>
    </div>
  );
};

export default TesteIf