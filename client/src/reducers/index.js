const initialState = {
    razas: [],
    allRazas: [],
    temperamentos: []
  };



  function rootReducer(state = initialState, action) {
    
    switch(action.type) {
      case 'GET_RAZAS':
        return {
          ...state,
          razas: action.payload,
          allRazas: action.payload
        }
      case 'FILTER_CREATED':
        const allRazas = state.allRazas
        const createdFilter = action.payload === 'created' ? allRazas.filter(el => el.createdInDb) : allRazas.filter(el => !el.createdInDb)
        return {
          ...state,
          razas: action.payload === 'all' ? state.allRazas : createdFilter

        }
      case 'ORDER_BY_NAME':
        let arr = action.payload === 'A-Z' ?
          state.razas.sort(function (a, b) {
            if(a.nombre > b.nombre) {
              return 1;
            }
            else if(b.nombre > a.nombre) {
              return -1;
            }
            return 0;
          }) :
          state.razas.sort(function (a, b) {
            if(a.nombre > b.nombre) {
              return -1;
            }
            else if(b.nombre > a.nombre) {
              return 1;
            }
            return 0;
          })

        return {
          ...state,
          razas: arr
        }

      default: 
        return state;
      
    }
  }
  
  export default rootReducer;