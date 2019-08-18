<?php
	
    class Mail
    {
    	public function returnMail($lstAttd){
    		$dbHost = 'localhost';
    		$dbUsername = 'root';
    		$dbPassword = '';
    		$dbName = 'test';
    
    	//connect with the database
    		$db = new mysqli($dbHost,$dbUsername,$dbPassword,$dbName);
			
			$arraym=array();
			$a=array();
    		$lst = split(',', $lstAttd);
    		foreach ($lst as $key) {
        	# code...
        	//echo $key;
        	$query = $db->query("SELECT * FROM nv WHERE name LIKE ltrim('".$key."')");
        	$row = $query->fetch_assoc();
        	//echo $row["email"];
        	$arraym[]=$row['email'];

    		}
    
    		foreach ($arraym as $key) {
        	# code...
        	$a[]=array('email' => $key);
        	//$a=array(
            //array('email' => $email)
            //array()
        	//)
    		}
			mysqli_close($db);
    		return $a;
    	}
    	
    }
    
?>