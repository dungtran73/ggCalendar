<?php
session_start();

if(!isset($_SESSION['access_token'])) {
	header('Location: google-login.php');
	exit();	
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>
<table align="center" cellspacing="0" cellpadding="0" border="1" width="900px">
<tr>
<td><strong>THỨ NGÀY</strong></td>
<td><strong>THỜI GIAN</strong></td>
<td><strong>NỘI DUNG</strong></td>
<td><strong>THÀNH PHẦN</strong></td>
<td><strong>ĐỊA ĐIỂM</strong></td>
<td><strong>CHỦ TRÌ</strong></td>
</tr>
<?php
	$servername = "localhost";
	$username = "";
	$password = "";
	$dbname = "test";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
	} 
	$sql="SELECT ngay,gio,noidung,thanhphan,diadiem,chutri FROM lichcongtac";
	$result=$conn->query($sql);
	while ($row=$result->fetch_assoc()) {
		# code...
?>
<tr>
		<td><?php echo $row["ngay"]; ?></td>
		<td><?php echo $row["gio"]; ?></td>
		<td><?php echo $row["noidung"]; ?></td>
		<td><?php echo $row["thanhphan"]; ?></td>
		<td><?php echo $row["diadiem"]; ?></td>
		<td><?php echo $row["chutri"]; ?></td>
</tr>
<?php } ?>
</table>

</body>
</html>