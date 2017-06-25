<?php
	require_once 'config.php';
		
	if (isset($_POST['set'])){
		$id = $_POST['id'];
        $rate = $_POST['rate'];
				
		$sql = "UPDATE tb_order SET rating='$rate' WHERE id_order='$id'";
		$result = mysqli_query($db,$sql);
        
		if($result)
        {
            echo 1;
        }
        else
        {
            echo 0;
        }
	}
?>