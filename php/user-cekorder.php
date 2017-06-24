<?php
	require_once 'config.php';
		
	if (isset($_POST['cek'])){
		$id = $_POST['id'];
				
		$sql = "SELECT ord_status FROM tb_order WHERE id_order='$id'";
		$result = mysqli_query($db,$sql);
		$row = mysqli_fetch_assoc($result);
        
        if($result)
        {
            echo $row['ord_status'];
        }
        else
        {
            echo 0;
        }
	}
?>