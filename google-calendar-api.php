<?php

class GoogleCalendarApi
{
	public function GetAccessToken($client_id, $redirect_uri, $client_secret, $code) {
		$url = 'https://accounts.google.com/o/oauth2/token';

		$curlPost = 'client_id=' . $client_id . '&redirect_uri=' . $redirect_uri . '&client_secret=' . $client_secret . '&code='. $code . '&grant_type=authorization_code';
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $curlPost);
		$data = json_decode(curl_exec($ch), true);
		$http_code = curl_getinfo($ch,CURLINFO_HTTP_CODE);
		if($http_code != 200)
			throw new Exception('Error : Failed to receieve access token');

		return $data;
	}

	public function GetCalendarsList($access_token) {
		$url_parameters = array();

		$url_parameters['fields'] = 'items(id,summary,timeZone)';
		$url_parameters['minAccessRole'] = 'owner';

		$url_calendars = 'https://www.googleapis.com/calendar/v3/users/me/calendarList?'. http_build_query($url_parameters);

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url_calendars);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer '. $access_token));
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		$data = json_decode(curl_exec($ch), true); //echo '<pre>';print_r($data);echo '</pre>';
		$http_code = curl_getinfo($ch,CURLINFO_HTTP_CODE);
		if($http_code != 200)
			throw new Exception('Error : Failed to get calendars list');

		return $data['items'];
	}

	public function CreateCalendarEvent($calendar_id, $summary, $event_time, $event_timezone, $event_location, $event_desc, $a, $access_token) {
		$url_events = 'https://www.googleapis.com/calendar/v3/calendars/' . $calendar_id . '/events';

		$curlPost = array('summary' => $summary, 'location' => $event_location, 'description' => $event_desc, 'attendees' => $a,
		 'reminders' => array(
			'useDefault' => FALSE,
			'overrides' => array(
			  array('method' => 'email', 'minutes' => 24 * 60),
			  array('method' => 'popup', 'minutes' => 10),
			),
		  ),
		);
		
		$curlPost['start'] = array('dateTime' => $event_time['start_time'], 'timeZone' => $event_timezone);
		$curlPost['end'] = array('dateTime' => $event_time['end_time'], 'timeZone' => $event_timezone);
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url_events);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer '. $access_token, 'Content-Type: application/json'));
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($curlPost));
		$data = json_decode(curl_exec($ch), true);
		$http_code = curl_getinfo($ch,CURLINFO_HTTP_CODE);
		if($http_code != 200)
			throw new Exception('Error : Failed to create event');

		return $data['id'];
	}

	public function DeleteCalendarEvent($event_id, $calendar_id, $access_token) {
		$url_events = 'https://www.googleapis.com/calendar/v3/calendars/' . $calendar_id . '/events/' . $event_id;

		$ch = curl_init();		
		curl_setopt($ch, CURLOPT_URL, $url_events);		
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);		
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');		
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer '. $access_token, 'Content-Type: application/json'));		
		$data = json_decode(curl_exec($ch), true);
		$http_code = curl_getinfo($ch,CURLINFO_HTTP_CODE);
		if($http_code != 204) 
			throw new Exception('Error : Failed to delete event');
	}

	public function UpdateCalendarEvent($event_id, $calendar_id, $summary, $event_time, $event_timezone, $event_location, $event_desc, $a, $access_token) {
		$url_events = 'https://www.googleapis.com/calendar/v3/calendars/' . $calendar_id . '/events/' . $event_id;
		$curlPost = array('summary' => $summary, 'location' => $event_location, 'description' => $event_desc, 'attendees' => $a,
		 'reminders' => array(
			'useDefault' => FALSE,
			'overrides' => array(
			  array('method' => 'email', 'minutes' => 24 * 60),
			  array('method' => 'popup', 'minutes' => 10),
			),
		  ),
		);
		$curlPost['start'] = array('dateTime' => $event_time['start_time'], 'timeZone' => $event_timezone);
		$curlPost['end'] = array('dateTime' => $event_time['end_time'], 'timeZone' => $event_timezone);
		
		$ch = curl_init();		
		curl_setopt($ch, CURLOPT_URL, $url_events);		
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);		
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');		
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Bearer '. $access_token, 'Content-Type: application/json'));	
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($curlPost));	
		$data = json_decode(curl_exec($ch), true);
		$http_code = curl_getinfo($ch,CURLINFO_HTTP_CODE);		
		if($http_code != 200) 
			throw new Exception('Error : Failed to update event');
	}
}
?>
