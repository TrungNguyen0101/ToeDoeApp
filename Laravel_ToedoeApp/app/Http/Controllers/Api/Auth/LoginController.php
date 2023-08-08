<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request)
    {
        // tìm ra email đầu tiên tìm thấy
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                "Error" => ["Không chính xác"]
            ]);
        }
        return response()->json([
            'user' => $user,
            'token' => $user->createToken('api_token')->plainTextToken
        ]);



        /* 
        auth() : truy cập đối tượng 
        attempt() : đăng nhập thử = tt cung cấp
        $request->only(['email', 'password']) : lấy ra email , password
        */
        // if (!auth()->attempt($request->only(['email', 'password']))) {
        //     throw ValidationException::withMessages([
        //         "Error" => ["Không chính xác"]
        //     ]);
        // }
    }
}
