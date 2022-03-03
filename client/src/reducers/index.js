const initialState = {
    razas: [],
    allRazas: [],
    temperamentos: [],
    detail: []
  };



  function rootReducer(state = initialState, action) {
    
    switch(action.type) {
      case 'GET_RAZAS':
        return {
          ...state,
          razas: action.payload,
          allRazas: action.payload
        }
      case 'POST_RAZA':
        return {
          ...state,
        }
      case 'GET_TEMPERAMENTS':
        return {
          ...state,
          temperamentos: action.payload
        }
      case 'GET_RAZAS_NAME':
        return {
          ...state,
          razas: action.payload
        }
      case 'FILTER_CREATED':
        const allRazas = state.allRazas
        const createdFilter = action.payload === 'created' ? allRazas.filter(el => el.createdInDb) : allRazas.filter(el => !el.createdInDb)
        return {
          ...state,
          razas: action.payload === 'all' ? state.allRazas : createdFilter

        }

        case 'FILTER_BY_TEMPERAMENT':
        const aux = state.allRazas
        const RazasFilter = aux.filter( el => el.createdInDb ? el.temperamentos.map( ob => ob.nombre === action.payload) : el.temperamento.includes(action.payload))
        // aux.filter(el => el.temperamento? el.temperamento.includes(action.payload) : el.temperamentos.nombre === action.payload) 
        return {
          ...state,
          razas:  RazasFilter

        }


      case 'GET_DETAILS':
        return {
          ...state,
          detail: action.payload
        }

        case 'SET_DETAIL':
          return {
            ...state,
            detail: action.payload
          }

      case 'ORDER_BY_NAME':
        let arr;
        if(action.payload === 'A-Z') {
          arr = state.razas.sort(function (a, b) {
            if(a.nombre > b.nombre) {
              return 1;
            }
            else if(b.nombre > a.nombre) {
              return -1;
            }
             return 0;
           })
        }
        if( action.payload === 'Z-A') {
          arr = state.razas.sort(function (a, b) {
             if(a.nombre > b.nombre) {
              return -1;
            }
             else if(b.nombre > a.nombre) {
              return 1;
            }
            return 0;
          })
        }
        if( action.payload === 'ascendente') {
          arr = state.razas.sort(function (a, b) {
             return parseInt(a.peso.split(' ')[0]) - parseInt(b.peso.split(' ')[0])
          })
        }
        if( action.payload === 'descendente') {
          arr = state.razas.sort(function (a, b) {
             return parseInt(b.peso.split(' ')[0]) - parseInt(a.peso.split(' ')[0])
          })
        }
          
  
          return {
            ...state,
            razas: arr
          }

      default: 
        return state;
      
    }
  }
  
  export default rootReducer;