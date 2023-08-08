<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        /* 
        auth() : truy cập vào hệ thống xác thực (authentication).
        guard('web') :  định nghĩa nhiều guard khác nhau trong tệp cấu hình "config/auth.php".
        logout() : được gọi trên guard "web", và nó được sử dụng để đăng xuất người dùng hiện tại khỏi hệ thống.
         */
        auth()->guard('web')->logout();
    }
}