describe('ThirdParty.restaurantApi() 애스팩트', () => {
  const api = ThirdParty.restaurantApi();

  describe('getRestaurantsNearConference(cuisine)', () => {
    const returnFromUnderlyingFunction = '아무거',
          cuisine = '중화요리';
    
    beforeEach(() => {
      spyOn(api, 'getRestaurantsWithinRadius')
        .and.returnValue(returnFromUnderlyingFunction);
    });

    it('올바른 인자로 getRestaurantsWithinRadius를 호출한다', () => {
      api.getRestaurantsNearConference(cuisine);
      expect(api.getRestaurantsWithinRadius).toHaveBeenCalledWith('종로 1가', 2.0, cuisine);
    });

    it('getRestaurantsWithinRadius로부터 받은 값을 반환한다', () => {
      const ret = api.getRestaurantsNearConference(cuisine);
      expect(ret).toBe(returnFromUnderlyingFunction);
    });
  });
});