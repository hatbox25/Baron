<?php
	require_once 'config.php';
		
	if (isset($_POST['acpt'])){
		$id = $_POST['id'];
        $idb = $_POST['idb'];
				
		$sql = "UPDATE tb_order SET ord_status='batal' WHERE id_order='$id'";
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