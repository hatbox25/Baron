<?php
    require_once 'config.php';
    require_once 'image_crop.php';

    if(isset($_FILES["st_file"]["type"]))
    {
        $id     = $_POST['id'];
        $name   = $_POST['sty'];
        $price  = $_POST['prc'];
            
        $validextensions = array("jpeg", "jpg","png");
        $temporary = explode(".", $_FILES["st_file"]["name"]);
        $file_extension = end($temporary);
     
        
        //CREATE DIR
        $path = '../upload/style/'.$id;
        if(!file_exists($path)){
            mkdir($path,0777,true);
        }
        
        if ((($_FILES["st_file"]["type"] == "image/png") || ($_FILES["st_file"]["type"] == "image/jpg") || ($_FILES["st_file"]["type"] == "image/jpeg")
        ) && ($_FILES["st_file"]["size"] < 100000)//Approx. 100kb files can be uploaded.
        && in_array($file_extension, $validextensions)) {
            if ($_FILES["st_file"]["error"] > 0)
            {
                echo "Return Code: " . $_FILES["st_file"]["error"];
            }
            else
            {
                if (file_exists($path."/".$_FILES["st_file"]["name"])) {
                    echo $_FILES["st_file"]["name"] . "already exists.";
                }
                else
                {
                    $temp = explode(".", $_FILES["st_file"]["name"]);
                    $newfilename = $name . '.' . end($temp);
                    move_uploaded_file($_FILES["st_file"]["tmp_name"], $path."/". $newfilename);
                    
                    resize_crop_image(500, 500, $path."/". $newfilename, $path."/". $newfilename);

                    $sql = "INSERT INTO tb_style(id_barber,sty_name,sty_price,sty_img) VALUES('$id','$name','$price','$newfilename')";
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