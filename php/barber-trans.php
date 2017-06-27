<?php
	require_once 'config.php';

	if(isset($_POST['get'])){
		$id= $_POST['id'];
		$response = array();
		$sql = "SELECT o.dt_order,(SELECT username FROM tb_users WHERE id_user=o.id_user)as user,s.sty_name,o.ord_status,o.rating,o.ord_price FROM tb_barber b, tb_order o, tb_users u, tb_style s WHERE o.id_barber = b.id_barber AND o.id_style = s.id_style AND b.id_user = '$id'";
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
