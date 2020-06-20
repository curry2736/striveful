<!DOCTYPE html>
<html lang="en">
<head>

	<title>Login V5</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="google-signin-client_id" content="111693266542-27mfb6bbhd8nmjjmlmk9nvarht00ic57.apps.googleusercontent.com">
	<script src="https://apis.google.com/js/platform.js" async defer></script>
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="fonts/Linearicons-Free-v1.0.0/icon-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="css/util.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
<!--===============================================================================================-->
</head>
<body>
	<script>
		function onSignIn(googleUser) {
		  var profile = googleUser.getBasicProfile();
		  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
		  console.log('Name: ' + profile.getName());
		  console.log('Image URL: ' + profile.getImageUrl());
		  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
		  document.getElementById('email-input').value=profile.getEmail();
		}
	</script>

	<?php
		
		//mohit test
		if( isset($_GET['submit']) )
		{
		    $name = htmlentities($_GET['name']);
		    $mail = htmlentities($_GET['email']);
		    $pass = htmlentities($_GET['password']);
		    $cpass = htmlentities($_GET['cpassword']);
		}
		$servername = "localhost";
		$password = "comejoinme123";
		$dbname = "myDB";
		$username = "admin";
		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);

		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}
		echo "Connected successfully " . $password . " ";

		$sql2 = "INSERT INTO useraccount (firstname, password, email, reg_date, username)
		VALUES('$name', '$pass', '$mail', '2020/27/20', 'test')";

		if(isset($name) ) {
			if ($conn->query($sql2) === TRUE) {
			} else {
			    echo "Error " . $conn->error;

				$conn->close();
			}
		}


	?>

	

	<div class="limiter">


		<div class="container-login100" style="background-image: url('images/bg-01.jpg');">

			<div class="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
				<form action="" method="get" class="login100-form validate-form flex-wex-sb flex-w">
					<span class="login100-form-title p-b-53">
						Sign Up With
					</span>

					<a href="#" class="btn-face m-b-20">
						<i class="fa fa-facebook-official"></i>
						Facebook
					</a>

					<a href="#" class="btn-google m-b-20">
						<img src="images/icons/icon-google.png" alt="GOOGLE">
						Google
					</a>
					<div class="g-signin2" data-onsuccess="onSignIn" action="oathtest.php"></div>

					<span class="login200-form-title">
						Or
					</span>


					<div class="p-t-31 p-b-9">
						<span class="txt1">
							Username
						</span>
					</div>
					<?php
						if(isset($name) ) {
							echo "username: " . $name;	
						}
					?>
					<div class="wrap-input100 validate-input" data-validate = "Username is required">
						<input class="input100" type="text" name="name" placeholder="Enter your username" >
						<span class="focus-input100"></span>
					</div>

					<div class="p-t-31 p-b-9">
						<span class="txt1">
							Email
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Email is required">
						<input id = "email-input" class="input100" type="text" name="email" placeholder="Enter your email">
						<span class="focus-input100"></span>
					</div>					
					<div class="p-t-13 p-b-9">
						<span class="txt1">
							Password
						</span>
					</div>
					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type="password" name="password"placeholder="Enter your password">
						<span class="focus-input100"></span>
					</div>
					<div class="wrap-input200 validate-input" data-validate = "Password is required">
						<input class="input100" type="password" name="cpassword" placeholder="Confirm your password">
						<span class="focus-input100"></span>
					</div>
					<div class="container-login100-form-btn m-t-17">
						<input type="submit" name="submit" value="Sign Up" class="login100-form-btn"><input>
					</div>

					<div class="w-full text-center p-t-55">
						<span class="txt2">
							Already have an account?
						</span>

						<a href="login.html" class="txt2 bo1">
							Sign in
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
	

	<div id="dropDownSelect1"></div>
	
<!--===============================================================================================-->
	<script src="vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/bootstrap/js/popper.js"></script>
	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="vendor/daterangepicker/moment.min.js"></script>
	<script src="vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
	<script src="js/main.js"></script>

</body>
</html>