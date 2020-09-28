import React from 'react'
import { RolMenuAccesoListar } from '../components/base/RolMenuAccesoListar';

const RolMenuAccesoPage = ({match}) => {
      let { idrol } = match.params;
    idrol = !idrol ? 0 : idrol;
    return (
      <RolMenuAccesoListar idrol={idrol}/>
    )
}

export default RolMenuAccesoPage;
