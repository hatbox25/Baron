<?php
    require_once 'config.php';
    require_once 'image_crop.php';

    if(isset($_FILES["file"]["type"]))
    {
        $id = $_POST['id'];
        $validextensions = array("jpg","jpeg","png");
        $temporary = explode(".", $_FILES["file"]["name"]);
        $file_extension = end($temporary);
        
//        $data = getimagesize($_FILES["file"]["tmp_name"]);
//        $w = $data[0];
//        $h = $data[1];
        
        if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpeg") || ($_FILES["file"]["type"] == "image/jpg")) && ($_FILES["file"]["size"] < 100000)//Approx. 100kb files can be uploaded.
        && in_array($file_extension, $validextensions)) {
            if ($_FILES["file"]["error"] > 0)
            {
                echo "Return Code: " . $_FILES["file"]["error"];
            }
//            else if($w != $h){
//                echo "Image must square";
//            }
            else
            {
                if (file_exists("upload/" . $_FILES["file"]["name"])) {
                    echo $_FILES["file"]["name"] . "already exists.";
//                   
                }
                else
                {
                    $temp = explode(".", $_FILES["file"]["name"]);
                    $newfilename = $id . '.' . 'jpg';//end($temp);
                    move_uploaded_file($_FILES["file"]["tmp_name"], "../upload/" . $newfilename);
                    
                    resize_crop_image(500, 500, "../upload/" . $newfilename, "../upload/" . $newfilename);
//                    $sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
//                    $targetPath = "../upload/".$_FILES['file']['name']; // Target path where file is to be stored
//                    move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded file
                    $sql = "UPDATE tb_barber SET barber_img = '$newfilename' WHERE id_user='$id'";
                    $result = mysqli_query($db,$sql);
                    
                    
                    echo "Image Uploaded Successfully...!!";
                }
            }
        }
        else
        {
            echo "***Invalid file Size or Type***";
        }
    }
?>