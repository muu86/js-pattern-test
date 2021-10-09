Aop.around(
  'restaurantApi',
  function addGetRestaurantsNearConference(targetInfo) {
    let api = Aop.next.call(this, targetInfo);

    function getRestaurantsNearConference(cuisine) {
      return api.getRestaurantsWithinRadius('종로 1가', 2.0, cuisine);
    }

    api.getRestaurantsNearConference = 
      api.getRestaurantsNearConference || getRestaurantsNearConference;

    return api;
  },
  ThirdParty
);