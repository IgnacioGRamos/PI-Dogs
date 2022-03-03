import axios from 'axios';



export function getRazas() {
    return  async function(dispatch) {
      var info = await axios.get('http://localhost:3001/dogs');
      return dispatch({
        type: 'GET_RAZAS',
        payload: info.data
      })
    };
};

export function getTemperaments() {
  return  async function(dispatch) {
    var info = await axios.get('http://localhost:3001/temperament');
    return dispatch({
      type: 'GET_TEMPERAMENTS',
      payload: info.data
    })
  };
};

export function postRaza(payload) {
  return  async function(dispatch) {
    var json = await axios.post('http://localhost:3001/dog', payload);
    return json;
  };
};


export function getRazasByName(name) {
  return  async function(dispatch) { 
    try {
      var info = await axios.get('http://localhost:3001/dogs?name=' + name);
      return dispatch({
      type: 'GET_RAZAS_NAME',
      payload: info.data
      })
    } catch (error) {
      console.log(error)
    } 
  };
};




export function filterCreated(payload) {
  return{
    type:'FILTER_CREATED',
    payload
  }
};


export function filterByTemperament(payload) {
  return{
    type:'FILTER_BY_TEMPERAMENT',
    payload
  }
};


export function orderByName(payload) {
  return{
    type:'ORDER_BY_NAME',
    payload
  }

}


export function getDetail(id) {
  return async function(dispatch) {
    try {
      var info = await axios.get('http://localhost:3001/dogs/' + id);
      return dispatch({
        type: 'GET_DETAILS',
        payload: info.data
      })
    } catch (error) {
      console.log(error)
      
    }
  }
}


export function setDetail() {
  return{
    type:'SET_DETAIL',
    payload: []
  }

}

