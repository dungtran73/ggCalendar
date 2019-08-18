<?php
session_start();
header('Content-type: application/json');

require_once('google-calendar-api.php');
require('getmail.php');

$link=mysql_connect("localhost","root","");
	mysql_select_db("test",$link);
	//error_reporting(0);
	$event = $_POST['event_details'];
	$capi = new GoogleCalendarApi();
	$event_time = $event['event_time'];
	$dateTime=$event_time['start_time'];
	$date=substr($dateTime,0,10);
	$hh=substr($dateTime,11,5);

	$idSukien="";
	//$sql="insert into lichcongtac(ngay,gio,noidung,diadiem,chutri) values('".$date."','".$hh."','".$event['title']."','".$event['location']."','".$event['description']."') ";
	//$r=mysql_query($sql);
	// if(!$r)
	// 	echo"error=======";

	//$event = $_POST['event_details'];
	$a=array();
	
	$lstA = new Mail();
	$a=$lstA->returnMail($event['event_attendees']);
	//$a=$lstA->returnMail("Hieu truong, Thu ky, ");
	//array_pop($a);

	// $a=array(
	// 		array(
	// 		'email' => 'dungtranq@live.com'),
	// 		array(
	// 		'email' => 'mmmm@gg.com'),
	// 	);

try {
	// Get event details
	//$event = $_POST['event_details'];
	
	$user_timezone="Asia/Ho_Chi_Minh";
	
	switch($event['operation']) {
		case 'create':
			
			// Create event on primary calendar
			$event_id = $capi->CreateCalendarEvent('primary', $event['title'], $event['event_time'], $user_timezone, $event['location'], $event['description'], $a, $_SESSION['access_token']);
			//Them su kien vao MySql
			GLOBAL $idSukien;
			$idSukien=$event_id;
			
			$sql="insert into lichcongtac(idSukien,ngay,gio,noidung,diadiem,chutri) values('".$event_id."','".$date."','".$hh."','".$event['title']."','".$event['location']."','".$event['description']."') ";
			$r=mysql_query($sql);
			if(!$r)
			echo"error=======";
	
			echo json_encode([ 'event_id' => $event_id ]);
			break;

		case 'update':
			//Cap nhat su kien trong MySql
			GLOBAL $idSukien;
			$sql="update lichcongtac set ngay='".$date."',gio='".$hh."',noidung='".$event['title']."',diadiem='".$event['location']."',chutri='".$event['description']."',chinhsua='1' WHERE idSukien='".$idSukien."'";
			
			//(idSukien,ngay,gio,noidung,diadiem,chutri) values('".$event_id."','".$date."','".$hh."','".$event['title']."','".$event['location']."','".$event['description']."') ";
			$r=mysql_query($sql);
			if(!$r)
			echo"error=======";
	
			// Update event on primary calendar
			$capi->UpdateCalendarEvent($event['event_id'], 'primary', $event['title'], $event['event_time'], $user_timezone, $event['location'], $event['description'], $a, $_SESSION['access_token']);

			echo json_encode([ 'updated' => 1 ]);
			break;

		case 'delete':
			//Xoa su kien trong MySql

			// Delete event on primary calendar
			$capi->DeleteCalendarEvent($event['event_id'], 'primary', $_SESSION['access_token']);

			echo json_encode([ 'deleted' => 1 ]);
			break;
	}

}
catch(Exception $e) {
	header('Bad Request', true, 400);
    echo json_encode(array( 'error' => 1, 'message' => $e->getMessage() ));
}

?>
