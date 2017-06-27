<?php
	require_once 'config.php';

	if(isset($_POST['get'])){
		$id= $_POST['id'];
		$response = array();
		$sql = "SELECT o.dt_order,(SELECT u.username FROM tb_users u,tb_barber b WHERE b.id_user=u.id_user AND b.id_barber=o.id_barber) as barber,s.sty_name,o.ord_status,o.rating,o.ord_price FROM tb_barber b, tb_order o, tb_users u, tb_style s WHERE o.id_style = s.id_style AND o.id_user = '$id'";
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
