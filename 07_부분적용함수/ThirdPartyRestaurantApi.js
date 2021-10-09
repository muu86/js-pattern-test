var ThirdParty = ThirdParty || {};
ThirdParty.restaurantApi = function() {
  return {
    getRestaurantsWithinRadius(address, radiusMiles, cuisine) {
      return {
        address,
        radiusMiles,
        cuisine
      };
    }
  };
};