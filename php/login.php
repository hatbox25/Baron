<?php
	require_once 'config.php';
	
	$response = array();
	
	
	if ($_POST){
		$userEmail = $_POST['email'];
		$userPass = md5($_POST['password']);
		
		$sql = "SELECT * FROM tb_users WHERE email='$userEmail' AND password='$userPass'";
		$result = mysqli_query($db,$sql);
		$num_row = mysqli_num_rows($result);
        while($row=mysqli_fetch_object($result)){
            $response[]=$row;
        }
        
        if($num_row > 0)
        {
            echo json_encode($response);
        }
        else
        {
            echo 0;
        }
	}
?>