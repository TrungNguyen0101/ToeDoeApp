<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            /* 
            foreignId: tạo khóa ngoại
            constrained : liên kết khóa ngoại
            nullable : có thể null
            cascadeOnDelete : xóa liên kết giữa 2 bảng
             */
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete()->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    //hoàn tác migration
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            //xóa ràng buộc
            $table->dropForeign(['user_id']);
            //xóa cột user_id khỏi bảng tash
            $table->dropColumn('user_id');
        });
    }
};
