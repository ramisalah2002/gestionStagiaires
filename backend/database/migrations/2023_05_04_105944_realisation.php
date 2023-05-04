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
        Schema::create('realisation', function (Blueprint $table) {
            $table->date('dateDebut');
            $table->dateTime('duree');
            $table->foreignId('stagiaire_id')->references('id')->on('stagiaire')->onDelete('cascade');
            $table->foreignId('encadrant_id')->references('id')->on('encadrant')->onDelete('cascade');
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
