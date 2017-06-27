<?php
	require_once 'config.php';

	if(isset($_POST['get'])){
		$id= $_POST['id'];
		$response = array();
		$sql = "SELECT (SELECT username FROM tb_users WHERE id_user=o.id_user)as user, (SELECT u.username FROM tb_users u,tb_barber b WHERE b.id_user=u.id_user AND b.id_barber=o.id_barber) as barber, rating,dt_order,ord_price,id_order,ord_status FROM tb_order o ORDER BY dt_finished DESC";
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
