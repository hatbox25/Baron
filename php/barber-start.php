<?php
	require_once 'config.php';
		
	if (isset($_POST['acpt'])){
		$id = $_POST['id'];
				
		$sql = "UPDATE tb_order SET ord_status='cukur' WHERE id_order='$id'";
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