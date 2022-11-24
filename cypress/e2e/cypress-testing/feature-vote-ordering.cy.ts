
describe("feature ordering", () => {
  before(() => {
    cy.clearRedis()

    cy.createFeature("request 1", "192.168.0.5");
    cy.createFeature("request 2", "192.168.0.5");
    cy.createFeature("request 3", "192.168.0.5");

    cy.visit("http://localhost:3000");
  });

  it("should have request 3 at top of list", () => {
    cy.request("http://localhost:3000/api/features").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.features.length).to.eq(3);
      const featuresList = response.body.features;

      const thirdRequest = featuresList.find(
        (item: { id: string; title: string }) => item.title == "request 3"
      );

      cy.vote(thirdRequest.id, thirdRequest.title, "192.168.0.2");
    });

    cy.reload();
    cy.get('[cy-data = "featuresList"]').children().first().contains('request 3')
  });

  it('should have request 2 at top of list', () => {
    cy.request("http://localhost:3000/api/features").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.features.length).to.eq(3);
      const featuresList = response.body.features;

      const thirdRequest = featuresList.find(
        (item: { id: string; title: string }) => item.title == "request 2"
      );

      cy.vote(thirdRequest.id, thirdRequest.title, "192.168.0.2");
      cy.vote(thirdRequest.id, thirdRequest.title, "192.168.0.3");
    });

    cy.reload();
    cy.get('[cy-data = "featuresList"]').children().first().contains('request 2')
  })

    it('should have request 1 at bottom of list', () => {
      cy.get('[cy-data = "featuresList"]').children().last().contains('request 1')
  })

  
});
