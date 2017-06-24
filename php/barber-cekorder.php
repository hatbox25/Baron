<?php
	require_once 'config.php';
		
	if (isset($_POST['cek'])){
		$id = $_POST['id'];
				
		$sql = "SELECT * FROM tb_order WHERE id_barber='$id' AND new='0'";
		$result = mysqli_query($db,$sql);
		$num_row = mysqli_num_rows($result);
        
        if($num_row > 0)
        {
            echo 1;
        }
        else
        {
            echo 0;
        }
	}
?>