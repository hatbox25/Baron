<?php
	require_once 'config.php';
		
	if (isset($_POST['cek'])){
		$id = $_POST['id'];
				
        $response = array();
		$sql = "SELECT o.id_order,u.username,o.ord_address,o.ord_phone,s.sty_name,o.ord_status FROM tb_order o,tb_users u,tb_style s WHERE u.id_user = o.id_user AND s.id_style=o.id_style AND o.id_barber='$id' AND o.new=0";
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