<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'flaremetadb');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'mHS24%*u87*wQze(Mo>-*A14ZTZYV;@Db*~)&uNYX^N1aqvf}WX/pkk8_xcNg Mu');
define('SECURE_AUTH_KEY',  'qKQ#W^M#OD CQeag.V$b{^b{{puKh(n/i03-|X&2:d1amyi$YO#9*$A>%8sH<,1a');
define('LOGGED_IN_KEY',    'yy4?_O7[EGHFpJ1$QGmb@vN@@VqMVBZk*Sdt3=rgTG&DDYqS,P0FvlH~43zecqtY');
define('NONCE_KEY',        'oD1OPt8xwkAL$6O*)fiT`E6/fB0n$Bx~.igvgTXZ80w-&[d56`XV>F:7/sJoE@z=');
define('AUTH_SALT',        'kbs|O,P.LL6nR>LF`{Fy<1u6hUZ};8=W=?EUj/D%R#nkDTeUUbm)2#BF.7S8/9pq');
define('SECURE_AUTH_SALT', 'hTO8pS}7rGedD/x1RdGoSHcaK;wELue9X9ab -CS.9beLXEwffbzGV>a{fW=!TW(');
define('LOGGED_IN_SALT',   '!;}KBs~+,gkmX&{lb-<UfeTo?;CL4yqH&8k^}eMwSowZ(Wl{oS~!~g^Eo7GyLnvo');
define('NONCE_SALT',       'SZb4vp7X@9 _cn*mj38tkU(+z+jl2dmL0V| ^J(Z,-xT&>X=$hjCoZ@+!@dI5H$:');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
