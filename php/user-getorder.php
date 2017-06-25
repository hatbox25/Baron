<?php
	require_once 'config.php';
		
	if (isset($_POST['cek'])){
		$idu = $_POST['idu'];
				
		$sql = "SELECT * FROM tb_order WHERE id_user='$idu' AND new='0' OR (rating='0' AND ord_status='selesai') ";
		
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