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
        Schema::create('utilisation_technologie', function (Blueprint $table) {
            $table->foreignId('projet_id')->references('id')->on('projet')->onDelete('cascade');
            $table->foreignId('technologie_id')->references('id')->on('technologie')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
