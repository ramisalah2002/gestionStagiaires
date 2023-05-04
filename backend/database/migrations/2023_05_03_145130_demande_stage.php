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
        Schema::create('demandeStage', function (Blueprint $table) {
            $table->id();
            $table->date('date_demande');
            $table->foreignId('utilisateur_id')->references('id')->on('utilisateur')->onDelete('cascade');
            $table->foreignId('adminstrateur_id')->references('id')->on('administrateur')->onDelete('cascade');
            $table->foreignId('stage_id');
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
