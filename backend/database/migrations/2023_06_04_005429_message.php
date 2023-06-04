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
        Schema::create('messsage', function (Blueprint $table) {
            $table->id();
            $table->foreignId('emetteur_id')->references('id')->on('utilisateur')->onDelete('cascade');
            $table->foreignId('recepteur_id')->references('id')->on('utilisateur')->onDelete('cascade');
            $table->text('contenu');
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
