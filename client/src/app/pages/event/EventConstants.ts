export class EventConstants {

  public static API_ENDPOINT = 'http://localhost:3000/api/events/';

  public static getTreasureHuntInfo() {
    return EventConstants.API_ENDPOINT + 'treasurehunt';
  }
}
