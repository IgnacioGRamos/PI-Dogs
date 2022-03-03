import { filterCreated, orderByName, getDetail } from "../actions/index.js";

describe("Action Creators", () => {
  it('Debería retornar una action con las propiedades type "FILTER_CREATED" y payload: Este contiene lo que recibe como argumento', () => {
    const payload = 'created';
    expect(filterCreated(payload)).toEqual({
      type: 'FILTER_CREATED',
      payload: 'created',
    });
  });
  it('Debería retornar una action con las propiedades type "ORDER_BY_NAME" y payload, su valor lo recibe por argumento:', () => {
    const payload = 'A-Z';
    expect(orderByName(payload)).toEqual({
      type: 'ORDER_BY_NAME',
      payload: 'A-Z',
    });
  });

});